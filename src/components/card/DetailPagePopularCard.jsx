import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

// CSS
import style from "./detailPagePopularCard.module.css";

// 상세보기 오른쪽 카드
function DetailPagePopularCard(props) {
  const { videoInfo } = props;
  const history = useHistory();

  // 클릭시 상세보기 페이지로 이동
  function videoDetail(id) {
    console.log(id);
    history.push(`/videoDtail/${id}`);
  }

  return (
    <div
      className={style.cardWrap}
      onClick={() => {
        videoDetail(videoInfo.id);
      }}
    >
      <img
        className={style.thumbnailImg}
        src={videoInfo.snippet.thumbnails.medium.url}
      ></img>
      <div className={style.videoInfo}>
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
  );
}

export default DetailPagePopularCard;
