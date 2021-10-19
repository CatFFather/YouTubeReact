import React from "react";

// CSS
import style from "./coment.module.css";

// UTIL
import { numberWithCommas } from "../../util/util";

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
        <p className={style.authorName}>
          {comment.snippet.topLevelComment.snippet.authorDisplayName}
        </p>
        <p
          className={style.textDisplay}
          dangerouslySetInnerHTML={{
            __html: comment.snippet.topLevelComment.snippet.textDisplay,
          }}
        ></p>
        <div className={style.likeCountWrap}>
          <i class="far fa-thumbs-up"></i>
          <div className={style.likeCount}>
            {numberWithCommas(
              comment.snippet.topLevelComment.snippet.likeCount
            )}
          </div>
          <i class="far fa-thumbs-down"></i>
          <div className={style.myComment}>답글</div>
        </div>
        {comment.snippet.totalReplyCount > 0 && (
          <div className={style.repliesWrap}>
            <span>
              <i class="fas fa-caret-down"></i> 답글{" "}
              {comment.snippet.totalReplyCount}개 보기
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Coment;
