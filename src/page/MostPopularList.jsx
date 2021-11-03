import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useInView } from "react-intersection-observer";

// CSS
import style from "./mostPopularList.module.css";

// COMPONENT
import PopularListInfoCard from "../components/card/PopularListInfoCard";

// SERVICE
import apiService from "../service/apiService";

// UTIL
import { getAllIndexes } from "../util/util";

// 인기 목록
function MostPopularList(props) {
  const [ref, inView] = useInView();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [popularList, setPopularList] = useState([]); // 인기 목록 + 채널 썸네일
  const [nextPageToken, setNextPageToken] = useState(null); // 인기 목록 페이지 토큰
  // 1. 첫 랜더링 시 목록 불러오기
  useEffect(() => {
    getMostPopularList();
  }, []);

  // 2. 인기 목록 불러오기
  function getMostPopularList() {
    setLoading(true);
    const filter = {
      part: ["snippet", "statistics"],
      chart: "mostPopular",
      maxResults: 25,
      regionCode: "KR",
      pageToken: nextPageToken || null,
    };
    apiService.getMostPopularList(filter).then((res) => {
      setNextPageToken(res.data.nextPageToken);
      let videoInfos = []; // 인기 목록
      videoInfos = res.data.items; // api 호출하여 받은 인기목록 videoInfos 변수에 저장
      getChannelsInfo(videoInfos); // 인기목록의 채널 id를 이용하여 채널 정보 불러오기
    });
  }

  // 3. 채널 정보 불러오기
  function getChannelsInfo(videoInfos) {
    // 채널 id를 arr 형태로 보내줘야함
    const channelIdArr = videoInfos.map((item) => {
      return item.snippet.channelId;
    });

    const filter = {
      part: "snippet",
      maxResults: 25,
      id: channelIdArr,
    };

    apiService.getChannelsInfo(filter).then((res) => {
      // indexOf를 이용하여 인기 목록의 순서로 정렬해주기
      let newChannelsInfoList = [];
      res.data.items.forEach((item, index) => {
        const indexOfAll = getAllIndexes(channelIdArr, item.id);
        indexOfAll.forEach((indexOf) => {
          newChannelsInfoList[indexOf] = item;
        });
      });
      // 인기 목록 + 채널 썸네일 state에 저장 할 새로운 arr 생성
      const newPopularList = videoInfos.map((item, index) => {
        item.snippet.channelThumbnails =
          newChannelsInfoList[index].snippet.thumbnails;
        return item;
      });
      setPopularList([...popularList, ...newPopularList]); // 인기 목록 + 채널 썸네일 state에 저장 (이전 리스트 + 새로운 리스트)
      setLoading(false);
    });
  }

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (popularList.length < 200 && inView && !loading) {
      getMostPopularList();
    }
  }, [inView, loading]);

  // 클릭시 상세보기 페이지로 이동
  function videoDetail(id) {
    history.push(`/videoDtail/${id}`);
  }

  return (
    <>
      <div className={style.popularListWrap}>
        {popularList.length > 0 &&
          popularList.map((videoInfo, index) => {
            return (
              <React.Fragment key={videoInfo.id}>
                {popularList.length - 1 == index ? (
                  <div
                    ref={ref}
                    className={style.popularLisCardWrap}
                    onClick={() => {
                      videoDetail(videoInfo.id);
                    }}
                  >
                    <PopularListInfoCard
                      videoInfo={videoInfo}
                    ></PopularListInfoCard>
                  </div>
                ) : (
                  <div
                    className={style.popularLisCardWrap}
                    onClick={() => {
                      videoDetail(videoInfo.id);
                    }}
                  >
                    <PopularListInfoCard
                      videoInfo={videoInfo}
                    ></PopularListInfoCard>
                  </div>
                )}
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}

export default MostPopularList;
