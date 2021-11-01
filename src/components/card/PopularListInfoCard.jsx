import React from "react";

// CSS
import style from "./popularListInfoCard.module.css";

// UTIL
import { numberWithCommas, timeForToday } from "../../util/util";

/**
 *
 * @param {Object} videoInfo // 비디오 정보
 * @returns
 */

// 인기 목록의 비디오 정보 card
function PopularListInfoCard(props) {
  const { videoInfo } = props;

  return (
    <>
      <div className={style.thumbnailImg}>
        <img src={videoInfo.snippet.thumbnails.medium.url} width={"100%"}></img>
      </div>
      <div className={style.videoInfo}>
        <img
          className={style.channelThumbnails}
          src={videoInfo.snippet.channelThumbnails.default.url}
          width={videoInfo.snippet.channelThumbnails.default.width}
          height={videoInfo.snippet.channelThumbnails.default.height}
        ></img>
        <div className={style.titleWrap}>
          <p className={style.videoTitle} title={videoInfo.snippet.title}>
            {videoInfo.snippet.title}
          </p>
          <p
            className={style.channelTitle}
            title={videoInfo.snippet.channelTitle}
          >
            {videoInfo.snippet.channelTitle}
          </p>
          <div className={style.viewCount}>
            조회수 {numberWithCommas(videoInfo.statistics.viewCount)}회
            <div className={style.dot}></div>
            {timeForToday(videoInfo.snippet.publishedAt)}
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularListInfoCard;
