import axios from 'axios';
import qs from 'qs';

const key = process.env.REACT_APP_KAKAO_API_KEY;
// axios 기본 값 설정
const axiosInstance = axios.create({
    baseURL: 'https://dapi.kakao.com/',
    headers: { Authorization: `KakaoAK ${key}` },
});

// 언어감지
const getLanguageDetect = (filter) => {
    return axiosInstance({
        method: 'get',
        url: `/v3/translation/language/detect?${qs.stringify(filter, { arrayFormat: 'repeat' })}`,
    });
};

// 번역하기
const getLanguagTranslate = (filter) => {
    return axiosInstance({
        method: 'get',
        url: `/v2/translation/translate?${qs.stringify(filter, { arrayFormat: 'repeat' })}`,
    });
};

export default {
    getLanguageDetect, // 인기 목록
    getLanguagTranslate, // 번역 하기
};
