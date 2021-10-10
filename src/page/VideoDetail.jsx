import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

// CSS
import style from "./videoDetail.module.css";

// SERVICE
import apiService from "../service/apiService";

// COMPONENT
import DetailPagePopularCard from "../components/card/DetailPagePopularCard";
import Coment from "../components/card/Coment";

// UTIL
import { getAllIndexes, formatDate, numberWithCommas } from "../util/util";

// 비디오 상세보기 페이지
function VideoDetail(props) {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const commentOrderSelectBox = useRef();
  const [videoInfo, setVideoInfo] = useState(null); // 비디오 상세 정보
  const [popularList, setPopularList] = useState([]); // 인기 목록 + 채널 썸네일
  const [moreAndLessBtn, setMoreAndLessBtn] = useState("더보기"); // 더보기 버튼 변경
  const [commentList, setCommentList] = useState([]); // 댓글 리스트
  const [commentOrder, setCommentOrder] = useState("relevance"); // 댓글 정렬 (기본값 추천수)

  // 1. 첫 랜더링 시
  useEffect(() => {
    getMostPopularList();
  }, []);

  // 2. pathname이 변경 될 때 getVideoInfo 함수 재호출
  useEffect(() => {
    getVideoInfo();
    getVideoComment();
  }, [location.pathname]);

  // 3. 비디오 상세 정보 받아오기
  function getVideoInfo() {
    const filter = {
      part: ["snippet", "statistics"],
      id: id,
    };
    apiService.getVideoInfo(filter).then((res) => {
      let videoInfo = []; // 상세 정보
      videoInfo = res.data.items; // api 호출하여 받은 상세 정보 videoInfos 변수에 저장
      getChannelInfo(videoInfo); // 상세 정보의 채널 id를 이용하여 채널 정보 불러오기
    });
  }

  // 4. 인기 목록 불러오기 (우측 리스트)
  function getMostPopularList() {
    const filter = {
      part: ["snippet", "statistics"],
      chart: "mostPopular",
      maxResults: 30,
      regionCode: "KR",
    };
    apiService.getMostPopularList(filter).then((res) => {
      let videoInfos = []; // 인기 목록
      videoInfos = res.data.items; // api 호출하여 받은 인기목록 videoInfos 변수에 저장
      setPopularList(videoInfos); // 인기 목록 + 채널 썸네일 state에 저장
    });
  }

  // 5. 채널 정보 불러오기
  function getChannelInfo(infos) {
    // 채널 id를 arr 형태로 보내줘야함
    const channelIdArr = infos.map((item) => {
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
      const newVideoInfo = infos.map((item, index) => {
        item.snippet.channelThumbnails =
          newChannelsInfoList[index].snippet.thumbnails;
        return item;
      });
      setVideoInfo(newVideoInfo[0]); // 비디오 정보 + 채널 썸네일 state에 저장
    });
  }

  // 6. 비디오 댓글 리스트 불러오기
  function getVideoComment() {
    const filter = {
      part: ["snippet", "replies"],
      videoId: id,
      maxResults: 30,
      order: commentOrder,
    };
    apiService.getVideoComment(filter).then((res) => {
      let commentInfo = []; // 상세 정보
      commentInfo = res.data.items; // api 호출하여 받은 상세 정보 videoInfos 변수에 저장
      setCommentList(commentInfo);
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

  // 8. select 박스 열고 닫는 함수
  function setCommentOrderSelectBox() {
    console.log(commentOrderSelectBox);
    console.log(commentOrderSelectBox.current);
    if (commentOrderSelectBox.current.style.display == "none") {
      commentOrderSelectBox.current.style.position = "absolute";
      commentOrderSelectBox.current.style.display = "";
    } else if (commentOrderSelectBox.current.style.position == "absolute") {
      commentOrderSelectBox.current.style.display = "none";
      commentOrderSelectBox.current.style.position = "";
    }
  }

  // 8. 댓글 정렬 기준 변경시 api 재호출
  useEffect(() => {
    getVideoComment();
  }, [commentOrder]);

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
              videoInfo.snippet.tags.map((tag, index) => {
                return (
                  <>
                    {index < 5 && (
                      <span
                        className={style.tags}
                        onClick={() => {
                          tagSearch(tag);
                        }}
                      >
                        #{tag}{" "}
                      </span>
                    )}
                  </>
                );
              })}
          </div>
          <p className={style.videoTitle}>{videoInfo.snippet.title}</p>
          <p className={style.date}>
            {videoInfo.statistics.viewCount && (
              <>
                조회수 {numberWithCommas(videoInfo.statistics.viewCount)}회
                <div className={style.dot}></div>
              </>
            )}
            {formatDate(videoInfo.snippet.publishedAt)}
          </p>
          {/* 동영상 설명란 */}
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
              <p className={style.channelTitle}>
                {videoInfo.snippet.channelTitle}
              </p>
              <p
                className={
                  moreAndLessBtn == "더보기"
                    ? style.descriptionLess
                    : style.descriptionMore
                }
                dangerouslySetInnerHTML={{
                  __html: videoInfo.snippet.localized.description,
                }}
              ></p>
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
          {/* 댓글 정보 */}
          <div className={style.commentInfo}>
            {videoInfo.statistics.commentCount && (
              <>댓글 {numberWithCommas(videoInfo.statistics.commentCount)}개</>
            )}
            <div className={style.commentOrderWrap}>
              <button
                className={style.commentOrderBtn}
                onClick={setCommentOrderSelectBox}
              >
                <img src="/images/orderBtn.png" />
                정렬 기준
              </button>
              <div
                ref={commentOrderSelectBox}
                style={{ display: "none" }}
                className={style.commentOrderSelectBox}
              >
                <div
                  className={style.commentOrderOption}
                  onClick={() => {
                    setCommentOrder("relevance");
                    setCommentOrderSelectBox();
                  }}
                >
                  인기 댓글순
                </div>
                <div
                  className={style.commentOrderOption}
                  onClick={() => {
                    setCommentOrder("time");
                    setCommentOrderSelectBox();
                  }}
                >
                  최근 날짜순
                </div>
              </div>
            </div>
          </div>
          <div className={style.commentList}>
            {commentList.length > 0 &&
              commentList.map((comment) => {
                return (
                  <>
                    <Coment comment={comment} />
                  </>
                );
              })}
          </div>
        </div>
        {/* 오른쪽 인기 목록 */}
        <div className={style.playList}>
          {popularList.length > 0 &&
            popularList.map((videoInfo, index) => {
              return <DetailPagePopularCard videoInfo={videoInfo} />;
            })}
        </div>
      </div>
    )
  );
}

export default VideoDetail;
