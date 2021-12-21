import React, { useRef, useEffect, useState } from 'react';

// CSS
import style from './css/reComent.module.css';

// API
import kakaoApiService from '../../service/kakaoApiService';

// UTIL
import { numberWithCommas } from '../../util/util';

function ReComent(props) {
    const { comment } = props;
    const textDisplay = useRef(); // 댓글 내용
    const translateBtn = useRef(); // 번역하기 버튼

    // 언어 감지
    function getLanguageDetect(coment) {
        const filter = {
            query: coment,
        };
        kakaoApiService
            .getLanguageDetect(filter)
            .then((rep) => {
                getLanguagTranslate(coment, rep.data.language_info[0]);
            })
            .catch((e) => {
                if (e.message.indexOf('code 429') != -1) {
                    alert('카카오 번역 api 호출 최대 초과');
                }
            });
    }

    // 번역하기
    function getLanguagTranslate(coment, language_info) {
        const filter = {
            query: coment,
            src_lang: language_info.code,
        };
        if (language_info.code == 'kr') {
            filter.target_lang = 'en';
        } else {
            filter.target_lang = 'kr';
        }
        kakaoApiService
            .getLanguagTranslate(filter)
            .then((rep) => {
                textDisplay.current.innerHTML = rep.data.translated_text[0];
                translateBtn.current.style.display = 'none';
            })
            .catch((e) => {
                if (e.message.indexOf('code 429') != -1) {
                    alert('카카오 번역 api 호출 최대 초과');
                }
            });
    }

    return (
        <div className={style.commentWrap}>
            <div className={style.authorProfileImgWrap}>
                <img className={style.authorProfileImg} src={comment.snippet.authorProfileImageUrl} />
            </div>
            <div>
                <p className={style.authorName}>{comment.snippet.authorDisplayName}</p>
                <p
                    ref={textDisplay}
                    className={style.textDisplay}
                    dangerouslySetInnerHTML={{
                        __html: comment.snippet.textDisplay,
                    }}
                ></p>
                <span
                    ref={translateBtn}
                    className={style.translateBtn}
                    onClick={() => {
                        getLanguageDetect(comment.snippet.textDisplay);
                    }}
                >
                    한국어 또는 영어로 번역
                </span>
                <div className={style.likeCountWrap}>
                    <i className="far fa-thumbs-up"></i>
                    <div className={style.likeCount}>{numberWithCommas(comment.snippet.likeCount)}</div>
                    <i className="far fa-thumbs-down"></i>
                </div>
            </div>
        </div>
    );
}

export default ReComent;
