import React from "react";

// CSS
import style from "./thumbnailCard.module.css";

function VideoInfoCard(props) {
  const { videoInfo } = props;
  const cardSize = {
    width: videoInfo.snippet.thumbnails.medium.width,
    // height: videoInfo && videoInfo.snippet.thumbnails.medium.height,
  };
  return (
    <>
      <div className={style.cardWrap} style={cardSize}>
        <img
          src={videoInfo.snippet.thumbnails.medium.url}
          width={videoInfo.snippet.thumbnails.medium.width}
          height={videoInfo.snippet.thumbnails.medium.height}
        ></img>
        <div>{videoInfo.snippet.title}</div>
        <div>
          <img
            src={videoInfo.snippet.channelThumbnails.default.url}
            width={videoInfo.snippet.channelThumbnails.default.width}
            height={videoInfo.snippet.channelThumbnails.default.height}
          ></img>
          {videoInfo.snippet.channelTitle}
        </div>
      </div>
    </>
  );
}

export default VideoInfoCard;
