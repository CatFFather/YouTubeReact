import React from "react";

// CSS
import style from "./videoInfoCard.module.css";

function VideoInfoCard(props) {
  const { videoInfo } = props;
  const cardSize = {
    width: videoInfo.snippet.thumbnails.medium.width,
    // height: videoInfo && videoInfo.snippet.thumbnails.medium.height,
  };
  return (
    <>
      <div className={style.cardWrap} style={cardSize}>
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
            <div className={style.videoTitle}>{videoInfo.snippet.title}</div>
            <div className={style.channelTitle}>
              {videoInfo.snippet.channelTitle}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoInfoCard;
