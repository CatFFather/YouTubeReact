import React from "react";

// CSS
import style from "./coment.module.css";

function Coment(props) {
  const { comment } = props;
  return (
    <div className={style.commentWrap}>
      <div className={style.authorProfileImgWrap}>
        <img
          className={style.authorProfileImg}
          src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
        />
      </div>
      <div>
        <div className={style.authorName}>
          {comment.snippet.topLevelComment.snippet.authorDisplayName}
        </div>
        <div
          className={style.textDisplay}
          dangerouslySetInnerHTML={{
            __html: comment.snippet.topLevelComment.snippet.textDisplay,
          }}
        ></div>
        {/* <div className={style.likeCount}>
          {comment.snippet.topLevelComment.snippet.likeCount}
        </div> */}
      </div>
    </div>
  );
}

export default Coment;
