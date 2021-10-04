import React, { useEffect, useState, Fragment } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

// CSS
import style from "./videoDetail.module.css";

// SERVICE
import apiService from "../service/apiService";

// COMPONENT
import DetailPagePopularCard from "../components/card/DetailPagePopularCard";

// UTIL
import { getAllIndexes, formatDate } from "../util/util";

// 비디오 상세보기 페이지
function VideoDetail(props) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [videoInfo, setVideoInfo] = useState(null);
  const [popularList, setPopularList] = useState([]); // 인기 목록 + 채널 썸네일
  const [moreAndLessBtn, setMoreAndLessBtn] = useState("더보기");

  // 1. 첫 랜더링 시
  useEffect(() => {
    getVideoInfo();
    getMostPopularList();
  }, []);

  // 2. pathname이 변경 될 때 getVideoInfo 함수 재호출
  useEffect(() => {
    getVideoInfo();
  }, [location.pathname]);

  // 3. 비디오 상세 정보 받아오기
  function getVideoInfo() {
    const filter = {
      part: "snippet",
      id: id,
    };
    apiService.getVideoInfo(filter).then((res) => {
      let videoInfo = []; // 상세 정보
      videoInfo = res.data.items; // api 호출하여 받은 상세 정보 videoInfos 변수에 저장
      getChannelInfo(videoInfo, "상세보기"); // 상세 정보의 채널 id를 이용하여 채널 정보 불러오기
    });
  }

  // 4. 인기 목록 불러오기 (우측 리스트)
  function getMostPopularList() {
    const filter = {
      part: "snippet",
      chart: "mostPopular",
      maxResults: 30,
      regionCode: "KR",
    };
    apiService.getMostPopularList(filter).then((res) => {
      let videoInfos = []; // 인기 목록
      videoInfos = res.data.items; // api 호출하여 받은 인기목록 videoInfos 변수에 저장
      getChannelInfo(videoInfos, "인기목록"); // 인기목록의 채널 id를 이용하여 채널 정보 불러오기
    });
  }

  // 5. 채널 정보 불러오기
  function getChannelInfo(videoInfos, type) {
    // 채널 id를 arr 형태로 보내줘야함
    const channelIdArr = videoInfos.map((item) => {
      return item.snippet.channelId;
    });
    const filter = {
      part: "snippet",
      maxResults: 50,
      id: channelIdArr,
    };
    apiService.getChannelsInfo(filter).then((res) => {
      // indexOf를 이용하여 비디오 정보의 순서로 정렬해주기
      let newChannelsInfoList = [];
      res.data.items.forEach((item, index) => {
        const indexOfAll = getAllIndexes(channelIdArr, item.id);
        indexOfAll.forEach((indexOf) => {
          newChannelsInfoList[indexOf] = item;
        });
      });
      // 비디오 정보 + 채널 썸네일 state에 저장 할 새로운 arr 생성
      const newVideoInfo = videoInfos.map((item, index) => {
        item.snippet.channelThumbnails =
          newChannelsInfoList[index].snippet.thumbnails;
        return item;
      });
      // type에 따라 분기처리
      if (type == "상세보기") {
        setVideoInfo(newVideoInfo[0]); // 비디오 정보 + 채널 썸네일 state에 저장
      } else if (type == "인기목록") {
        setPopularList(newVideoInfo); // 인기 목록 + 채널 썸네일 state에 저장
      }
    });
  }

  // 6. 태그클릭 시 태그 명으로 검색
  function tagSearch(tag) {
    if (!tag) return;
    history.push(`/searchList?q=${tag}`);
  }

  // 7. 더보기 간략히 버튼
  function getMoreAndLessBtn() {
    if (moreAndLessBtn == "더보기") {
      setMoreAndLessBtn("간략히");
    } else {
      setMoreAndLessBtn("더보기");
    }
  }

  return (
    videoInfo && (
      <div className={style.detailWrap}>
        <div className={style.videoInfo}>
          <div className={style.video}>
            <iframe
              id="player"
              type="text/html"
              width="100%"
              height="100%"
              src={`http://www.youtube.com/embed/${videoInfo.id}?enablejsapi=1&origin=http://example.com`}
              frameborder="0"
            ></iframe>
          </div>
          <div className={style.tagsWrap}>
            {videoInfo.snippet.tags &&
              videoInfo.snippet.tags.map((tag) => {
                return (
                  <span
                    className={style.tags}
                    onClick={() => {
                      tagSearch(tag);
                    }}
                  >
                    #{tag}{" "}
                  </span>
                );
              })}
          </div>
          <div className={style.videoTitle}>{videoInfo.snippet.title}</div>
          <div className={style.date}>
            {formatDate(videoInfo.snippet.publishedAt)}
          </div>
          <div className={style.descriptionWrap}>
            <div className={style.descriptionLeft}>
              <img
                className={style.channelThumbnails}
                src={videoInfo.snippet.channelThumbnails.default.url}
                width={videoInfo.snippet.channelThumbnails.default.width}
                height={videoInfo.snippet.channelThumbnails.default.height}
              ></img>
            </div>
            <div className={style.descriptionRight}>
              <div className={style.channelTitle}>
                {videoInfo.snippet.channelTitle}
              </div>
              <div
                className={
                  moreAndLessBtn == "더보기"
                    ? style.descriptionLess
                    : style.descriptionMore
                }
              >
                {videoInfo.snippet.description}
              </div>
              <div>
                <span
                  className={style.moreAndLessBtn}
                  onClick={() => {
                    getMoreAndLessBtn();
                  }}
                >
                  {moreAndLessBtn}
                </span>
              </div>
            </div>
            <div className={style.subscribeBtnWrap}>
              <button className={style.subscribeBtn}>구독</button>
            </div>
          </div>
        </div>
        <div className={style.playList}>
          {popularList.length > 0 &&
            popularList.map((videoInfo, index) => {
              return (
                <DetailPagePopularCard key={index} videoInfo={videoInfo} />
              );
            })}
        </div>
      </div>
    )
  );
}

export default VideoDetail;
