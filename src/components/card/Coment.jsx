import React, { useRef, useEffect } from 'react';

// CSS
import style from './coment.module.css';

// API
import kakaoApiService from '../../service/kakaoApiService';

// UTIL
import { numberWithCommas } from '../../util/util';

function Coment(props) {
    const { comment } = props;
    const textDisplay = useRef(); // 댓글 내용
    const translateBtn = useRef(); // 번역하기 버튼
    // 랜더링 시 언어 감지 후 번역 여부 결정
    useEffect(() => {
        getLanguageDetect(comment.snippet.topLevelComment.snippet.textDisplay);
    }, []);

    // 언어 감지
    function getLanguageDetect(coment) {
        const filter = {
            query: coment,
        };
        kakaoApiService.getLanguageDetect(filter).then((rep) => {
            console.log(rep);
            if (rep.data.language_info[0].code == 'kr') {
                translateBtn.current.style.display = 'none';
            } else {
                translateBtn.current.onclick = () => {
                    translateBtn.current.style.display = 'initial';
                    getLanguagTranslate(coment, rep.data.language_info[0]);
                };
            }
        });
    }

    // 번역하기
    function getLanguagTranslate(coment, language_info) {
        const filter = {
            query: coment,
            target_lang: 'kr',
            src_lang: language_info.code,
        };
        kakaoApiService.getLanguagTranslate(filter).then((rep) => {
            textDisplay.current.innerHTML = rep.data.translated_text[0];
            translateBtn.current.style.display = 'none';
        });
    }

    return (
        <div className={style.commentWrap}>
            <div className={style.authorProfileImgWrap}>
                <img className={style.authorProfileImg} src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} />
            </div>
            <div>
                <p className={style.authorName}>{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
                <p
                    ref={textDisplay}
                    className={style.textDisplay}
                    dangerouslySetInnerHTML={{
                        __html: comment.snippet.topLevelComment.snippet.textDisplay,
                    }}
                ></p>
                <p
                    ref={translateBtn}
                    className={style.translateBtn}
                    onClick={() => {
                        getLanguagTranslate(comment.snippet.topLevelComment.snippet.textDisplay);
                    }}
                >
                    한국어로 번역
                </p>
                <div className={style.likeCountWrap}>
                    <i className="far fa-thumbs-up"></i>
                    <div className={style.likeCount}>{numberWithCommas(comment.snippet.topLevelComment.snippet.likeCount)}</div>
                    <i className="far fa-thumbs-down"></i>
                    <div className={style.myComment}>답글</div>
                </div>
                {comment.snippet.totalReplyCount > 0 && (
                    <div className={style.repliesWrap}>
                        <span>
                            <i className="fas fa-caret-down"></i> 답글 {comment.snippet.totalReplyCount}개 보기
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Coment;
