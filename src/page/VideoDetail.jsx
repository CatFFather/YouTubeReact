import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

// CSS
import style from "./videoDetail.module.css";

// SERVICE
import apiService from "../service/apiService";

// UTIL
import { getAllIndexes } from "../util/util";

// 비디오 상세보기 페이지
function VideoDetail(props) {
  const { id } = useParams();
  const history = useHistory();
  const [videoInfo, setVideoInfo] = useState(null);
  console.log(videoInfo);

  useEffect(() => {
    getVideoInfo();
  }, []);

  // 1. 비디오 상세 정보 받아오기
  function getVideoInfo() {
    const filter = {
      part: "snippet",
      id: id,
    };
    apiService.getVideoInfo(filter).then((res) => {
      console.log(res);
      let videoInfo = []; // 인기 목록
      videoInfo = res.data.items; // api 호출하여 받은 인기목록 videoInfos 변수에 저장
      getChannelInfo(videoInfo); // 인기목록의 채널 id를 이용하여 채널 정보 불러오기
    });
  }

  // 2. 채널 정보 불러오기
  function getChannelInfo(videoInfos) {
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
      // indexOf를 이용하여 인기 목록의 순서로 정렬해주기
      let newChannelsInfoList = [];
      res.data.items.forEach((item, index) => {
        const indexOfAll = getAllIndexes(channelIdArr, item.id);
        indexOfAll.forEach((indexOf) => {
          newChannelsInfoList[indexOf] = item;
        });
      });
      // 인기 목록 + 채널 썸네일 state에 저장 할 새로운 arr 생성
      const newVideoInfo = videoInfos.map((item, index) => {
        item.snippet.channelThumbnails =
          newChannelsInfoList[index].snippet.thumbnails;
        return item;
      });
      setVideoInfo(newVideoInfo[0]); // 인기 목록 + 채널 썸네일 state에 저장
    });
  }

  // 3. 태그클릭 시 태그 명으로 검색
  function tagSearch(tag) {
    if (!tag) return;
    history.push(`/searchList?q=${tag}`);
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
          <div className={style.tags}>
            {videoInfo.snippet.tags &&
              videoInfo.snippet.tags.map((tag) => {
                return (
                  <span
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
          <div className={style.date}>{videoInfo.snippet.publishedAt}</div>
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
              <div className={style.description}>
                {videoInfo.snippet.description}
              </div>
            </div>
          </div>
        </div>
        <div className={style.playList}></div>
      </div>
    )
  );
}

export default VideoDetail;
