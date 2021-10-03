import React from "react";

// CSS
import style from "./channelInfoCard.module.css";

// 검색 시 채널 정보 card
function ChannelInfoCard(props) {
  const { channelInfo } = props;
  return (
    <div className={style.cardWrap}>
      <div className={style.thumbnailsWrap}>
        <img
          className={style.thumbnails}
          src={channelInfo.snippet.thumbnails.medium.url}
          width="100%"
          height="100%"
        ></img>
      </div>
      <div className={style.channelInfo}>
        <div className={style.channelTitle}>
          {channelInfo.snippet.channelTitle}
        </div>
        <div className={style.description}>
          {channelInfo.snippet.description}
        </div>
      </div>
    </div>
  );
}

export default ChannelInfoCard;