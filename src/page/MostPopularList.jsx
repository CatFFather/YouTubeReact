import React, { useState, useEffect } from "react";

// COMPONENT
import PopularListInfoCard from "../components/card/PopularListInfoCard";

// SERVICE
import apiService from "../service/apiService";

// UTIL
import { getAllIndexes } from "../util/util";

// 인기 목록
function MostPopularList(props) {
  const [popularList, setPopularList] = useState([]); // 인기 목록 + 채널 썸네일

  // 1. 첫 랜더링 시 목록 불러오기
  useEffect(() => {
    getMostPopularList();
  }, []);

  // 2. 인기 목록 불러오기
  function getMostPopularList() {
    const filter = {
      part: ["snippet", "statistics"],
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "KR",
    };
    apiService.getMostPopularList(filter).then((res) => {
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
      maxResults: 50,
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
      setPopularList(newPopularList); // 인기 목록 + 채널 썸네일 state에 저장
    });
  }

  return (
    <>
      {popularList.length > 0 &&
        popularList.map((videoInfo, index) => {
          return (
            <PopularListInfoCard
              key={videoInfo.id}
              videoInfo={videoInfo}
            ></PopularListInfoCard>
          );
        })}
    </>
  );
}

export default MostPopularList;
