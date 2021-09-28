import React from "react";

// CSS
import style from "./thumbnailCard.module.css";
function ThumbnailCard(props) {
  const { videoInfo } = props;
  const cardSize = {
    width: videoInfo && videoInfo.snippet.thumbnails.medium.width,
    // height: videoInfo && videoInfo.snippet.thumbnails.medium.height,
  };
  return (
    <>
      <div className={style.cardWrap} style={cardSize}>
        <img
          src={videoInfo && videoInfo.snippet.thumbnails.medium.url}
          width={videoInfo && videoInfo.snippet.thumbnails.medium.width}
          height={videoInfo && videoInfo.snippet.thumbnails.medium.height}
        ></img>
        <div>{videoInfo.snippet.title}</div>
        <div>{videoInfo.snippet.channelTitle}</div>
      </div>
    </>
  );
}

export default ThumbnailCard;
