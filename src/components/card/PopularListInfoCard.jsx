import React from "react";
import { useHistory } from "react-router-dom";

// CSS
import style from "./popularListInfoCard.module.css";

// 비디오 카드 (단일)

/**
 *
 * @param {Object} videoInfo // 비디오 정보
 * @returns
 */
function VideoInfoCard(props) {
  const { videoInfo } = props;
  const history = useHistory();
  const cardSize = {
    width: videoInfo.snippet.thumbnails.medium.width,
    // height: videoInfo && videoInfo.snippet.thumbnails.medium.height,
  };

  function VideoDetail(id) {
    console.log(id);
    history.push(`/videoDtail/${id}`);
  }

  return (
    <>
      <div
        className={style.cardWrap}
        style={cardSize}
        onClick={() => {
          VideoDetail(videoInfo.id);
        }}
      >
        <div className={style.thumbnailImg}>
          <img
            src={videoInfo.snippet.thumbnails.medium.url}
            width={videoInfo.snippet.thumbnails.medium.width}
            height={videoInfo.snippet.thumbnails.medium.height}
          ></img>
        </div>
        <div className={style.videoInfo}>
          <img
            className={style.channelThumbnails}
            src={videoInfo.snippet.channelThumbnails.default.url}
            width={videoInfo.snippet.channelThumbnails.default.width}
            height={videoInfo.snippet.channelThumbnails.default.height}
          ></img>
          <div className={style.titleWrap}>
            <div className={style.videoTitle} title={videoInfo.snippet.title}>
              {videoInfo.snippet.title}
            </div>
            <div
              className={style.channelTitle}
              title={videoInfo.snippet.channelTitle}
            >
              {videoInfo.snippet.channelTitle}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoInfoCard;
