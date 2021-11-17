import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

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
  const [moreAndLessBtn, setMoreAndLessBtn] = useState("더보기"); // 더보기 버튼 변경
  // 인기 목록
  const [popularList, setPopularList] = useState([]); // 인기 목록 + 채널 썸네일
  const [popularPageToken, setPopularPageToken] = useState(null); // 인기목록 페이지 토큰
  // 댓글
  const [commentList, setCommentList] = useState([]); // 댓글 리스트
  const [commentPageToken, setCommentPageToken] = useState(null); // 댓글목록 페이지 토큰
  const [commentOrder, setCommentOrder] = useState("relevance"); // 댓글 정렬 (기본값 추천수)
  // 무한 스크롤 페이징 처리
  const [comentRef, comentInView] = useInView();
  const [popularRef, popularInView] = useInView();
  const [comentLoading, setComentLoading] = useState(false);
  const [popularLoading, setPopularLoading] = useState(false);

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
    setPopularLoading(true);
    const filter = {
      part: ["snippet", "statistics"],
      chart: "mostPopular",
      maxResults: 40,
      regionCode: "KR",
      pageToken: popularPageToken || null,
    };
    apiService.getMostPopularList(filter).then((res) => {
      setPopularPageToken(res.data.nextPageToken);
      let videoInfos = []; // 인기 목록
      videoInfos = res.data.items; // api 호출하여 받은 인기목록 videoInfos 변수에 저장
      setPopularList([...popularList, ...videoInfos]); // 인기 목록 + 채널 썸네일 state에 저장
      setPopularLoading(false);
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
    setComentLoading(true);
    const filter = {
      part: ["snippet", "replies"],
      videoId: id,
      maxResults: 25,
      order: commentOrder,
      pageToken: commentPageToken || null,
    };
    apiService.getVideoComment(filter).then((res) => {
      let commentInfo = []; // 상세 정보
      commentInfo = res.data.items; // api 호출하여 받은 상세 정보 videoInfos 변수에 저장
      setCommentList([...commentList, ...commentInfo]);
      setCommentPageToken(res.data.nextPageToken);
      setComentLoading(false);
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

  // 9. 무한 스크롤 (댓글)
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (comentInView && !comentLoading) {
      getVideoComment();
    }
  }, [comentInView, comentLoading]);

  // 10. 무한 스크롤 (인기 목록)
  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (popularList.length < 200 && popularInView && !popularLoading) {
      getMostPopularList();
    }
  }, [popularInView, popularLoading]);

  return (
    videoInfo && (
      <div className={style.detailWrap}>
        <div className={style.videoInfo}>
          <div className={style.videoWrap}>
            <iframe
              className={style.video}
              src={`http://www.youtube.com/embed/${videoInfo.id}`}
              allowFullScreen
            ></iframe>
          </div>
          <div className={style.tagsWrap}>
            {videoInfo.snippet.tags &&
              videoInfo.snippet.tags.map((tag, index) => {
                return (
                  <>
                    {index < 3 && (
                      <span
                        key={index}
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
          <div className={style.countAndDate}>
            <div>
              {videoInfo.statistics.viewCount && (
                <>
                  조회수 {numberWithCommas(videoInfo.statistics.viewCount)}회
                  <div className={style.dot}></div>
                </>
              )}
              {formatDate(videoInfo.snippet.publishedAt)}
            </div>
            <div className={style.likeCountWrap}>
              <i className="far fa-thumbs-up bigIcon"></i>
              <div className={style.likeCount}>
                {numberWithCommas(videoInfo.statistics.likeCount)}
              </div>
              <i className="far fa-thumbs-down bigIcon"></i>
              <div className={style.dislikeCount}>
                {numberWithCommas(videoInfo.statistics.dislikeCount)}
              </div>
            </div>
          </div>
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
                    setCommentList([]);
                    setCommentPageToken(null);
                  }}
                >
                  인기 댓글순
                </div>
                <div
                  className={style.commentOrderOption}
                  onClick={() => {
                    setCommentOrder("time");
                    setCommentOrderSelectBox();
                    setCommentList([]);
                    setCommentPageToken(null);
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
                  <React.Fragment key={comment.id}>
                    <div ref={comentRef}>
                      <Coment comment={comment} />
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
        {/* 오른쪽 인기 목록 */}
        <div className={style.playList}>
          {popularList.length > 0 &&
            popularList.map((videoInfo, index) => {
              return (
                <React.Fragment key={videoInfo.id}>
                  <div ref={popularRef}>
                    <DetailPagePopularCard videoInfo={videoInfo} />
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
    )
  );
}

export default VideoDetail;
