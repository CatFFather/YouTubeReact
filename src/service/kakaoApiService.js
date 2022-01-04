import axios from 'axios';
import qs from 'qs';

const key = process.env.REACT_APP_KAKAO_API_KEY;
const authKey = process.env.REACT_APP_KAKAO_LOGIN_KEY;
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

// 카카오 로그인 페이지로 이동(팝업)
const kakaoLoginPage = (params) => {
    Kakao.Auth.login(params);
};

// 현재 카카오로 로그인한 유저 정보
const kakaoUserInfo = (params) => {
    Kakao.API.request({
        url: '/v2/user/me',
        success: params.success,
        fail: params.fail,
    });
};

export default {
    getLanguageDetect, // 인기 목록
    getLanguagTranslate, // 번역 하기
    kakaoLoginPage, // 카카오 로그인 페이지로 이동(팝업)
    kakaoUserInfo, // 현재 카카오로 로그인한 유저 정보
};
