import React from "react";
import { useHistory } from "react-router-dom";
// CSS
import style from "./searchListCard.module.css";

// UTIL
import { numberWithCommas, timeForToday } from "../../util/util";

// 검색 시 비디오 정보 card
function SearchListCard(props) {
  const history = useHistory();
  const { videoInfo } = props;
  console.log(videoInfo);

  // 클릭시 상세보기 페이지로 이동
  function videoDetail(id) {
    history.push(`/videoDtail/${id}`);
  }

  return (
    <div
      className={style.cardWrap}
      onClick={() => {
        videoDetail(videoInfo.id.videoId);
      }}
    >
      <img
        src={videoInfo.snippet.thumbnails.medium.url}
        width={videoInfo.snippet.thumbnails.medium.width}
        height={videoInfo.snippet.thumbnails.medium.height}
      ></img>
      <div className={style.videoInfoWrap}>
        <div
          className={style.title}
          dangerouslySetInnerHTML={{
            __html: videoInfo.snippet.title,
          }}
        ></div>
        <div className={style.viewCount}>
          {/* 조회수 {numberWithCommas(videoInfo.statistics.viewCount)}회 */}
          <div className={style.dot}></div>
          {timeForToday(videoInfo.snippet.publishedAt)}
        </div>
        <div className={style.channelTitle}>
          <img
            className={style.channelThumbnails}
            src={videoInfo.snippet.channelThumbnails.default.url}
          ></img>
          {videoInfo.snippet.channelTitle}
        </div>
        <div className={style.description}>{videoInfo.snippet.description}</div>
      </div>
    </div>
  );
}

export default SearchListCard;
