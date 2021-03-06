import axios from "axios";
import qs from "qs";

const key = process.env.REACT_APP_YOUTUBE_API_KEY;
// axios 기본 값 설정
const axiosInstance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  headers: { "Content-type": "application/json" },
  params: { key: key },
  // timeout: 1000,
});

// 인기 목록
const getMostPopularList = (filter) => {
  return axiosInstance({
    method: "get",
    url: `/videos?${qs.stringify(filter, { arrayFormat: "repeat" })}`,
  });
};

// 키워드 검색 리스트
const getSearchList = (filter) => {
  return axiosInstance({
    method: "get",
    url: `/search?${qs.stringify(filter, { arrayFormat: "repeat" })}`,
  });
};

// 채널 정보 리스트
const getChannelsInfo = (filter) => {
  return axiosInstance({
    method: "get",
    url: `/channels?${qs.stringify(filter, { arrayFormat: "repeat" })}`,
  });
};

// 비디오 정보 (단일 조회)
const getVideoInfo = (filter) => {
  return axiosInstance({
    method: "get",
    url: `/videos?${qs.stringify(filter, { arrayFormat: "repeat" })}`,
  });
};

// 비디오 댓글 리스트
const getVideoComment = (filter) => {
  return axiosInstance({
    method: "get",
    url: `/commentThreads?${qs.stringify(filter, { arrayFormat: "repeat" })}`,
  });
};

export default {
  getMostPopularList, // 인기 목록
  getSearchList, // 키워드 검색 리스트
  getChannelsInfo, // 채널 정보 리스트
  getVideoInfo, // 비디오 정보 (단일 조회)
  getVideoComment, // 비디오 댓글 리스트
};
