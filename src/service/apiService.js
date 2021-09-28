import axios from 'axios';
import qs from 'qs';

// axios 기본 값 설정
const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    headers: { 'Content-type': 'application/json' },
    // timeout: 1000,
});
const key = 'AIzaSyBjY4SiEXfH0UHaLk9BkSR0jkstumVwddk';

// 인기 목록 api 호출
const getMostPopularList = (filter) => {
    filter.key = key;
    return axiosInstance({
        method: 'get',
        url: `/videos?${qs.stringify(filter, { arrayFormat: 'repeat' })}`,
    });
};

// 키워드 검색 리스트
const getSearchList = (filter) => {
    filter.key = key;
    return axiosInstance({
        method: 'get',
        url: `/search?${qs.stringify(filter, { arrayFormat: 'repeat' })}`,
    });
};
export default {
    getMostPopularList, // 인기 목록 api 호출
    getSearchList, // 키워드 검색 리스트
};
