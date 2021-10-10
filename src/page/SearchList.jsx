import React, { useState, useEffect } from "react";
import qs from "qs";
import { useLocation } from "react-router-dom";

// COMPONENT
import SearchListCard from "../components/card/SearchListCard";
import ChannelInfoCard from "../components/card/ChannelInfoCard";

// SERVICE
import apiService from "../service/apiService";

// UTIL
import { getAllIndexes } from "../util/util";

// 검색 목록
function SearchList(props) {
  const location = useLocation();
  const [searchList, setSearchList] = useState([]); // api를 통해 얻은 검색 목록
  const style = {
    maxWidth: "1300px",
    margin: "auto",
  };

  // 1. query 변경 시 리스트 갱신
  const query = qs.parse(location.search.replace("?", ""));
  useEffect(() => {
    getSearchList();
  }, [location.search]);

  // 키워드 검색 불러오기
  function getSearchList() {
    const filter = {
      part: "snippet",
      maxResults: 25,
      q: query.q,
    };
    apiService.getSearchList(filter).then((res) => {
      let videoInfos = []; // 검색 목록
      videoInfos = res.data.items; // api 호출하여 받은 검색목록 videoInfos 변수에 저장
      getChannelsInfo(videoInfos); // 검색목록의 채널 id를 이용하여 채널 정보 불러오기
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
      // indexOf를 이용하여 검색 목록의 순서로 정렬해주기
      let newChannelsInfoList = [];
      res.data.items.forEach((item, index) => {
        const indexOfAll = getAllIndexes(channelIdArr, item.id);
        indexOfAll.forEach((indexOf) => {
          newChannelsInfoList[indexOf] = item;
        });
      });
      // 검색 목록 + 채널 썸네일 state에 저장 할 새로운 arr 생성
      const newSearchList = videoInfos.map((item, index) => {
        item.snippet.channelThumbnails =
          newChannelsInfoList[index].snippet.thumbnails;
        return item;
      });
      setSearchList(newSearchList); // 검색 목록 + 채널 썸네일 state에 저장
    });
  }

  return (
    <div style={style}>
      {searchList.length > 0 &&
        searchList.map((videoInfo, index) => {
          return (
            <>
              {videoInfo.id.kind == "youtube#channel" ? (
                <ChannelInfoCard
                  key={videoInfo.id.channelId}
                  channelInfo={videoInfo}
                />
              ) : (
                <SearchListCard
                  key={videoInfo.id.videoId}
                  videoInfo={videoInfo}
                ></SearchListCard>
              )}
            </>
          );
        })}
    </div>
  );
}

export default SearchList;
