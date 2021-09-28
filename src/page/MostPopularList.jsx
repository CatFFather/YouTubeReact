import React, { useState, useEffect } from "react";

// COMPONENT
import ThumbnailCard from "../components/card/ThumbnailCard";

// SERVICE
import apiService from "../service/apiService";

// 인기 목록
function MostPopularList(props) {
  const [popularList, setPopularList] = useState([]); // api를 통해 얻은 인기 목록

  // 1. 첫 랜더링 시 목록 불러오기
  useEffect(() => {
    getMostPopularList();
  }, []);

  // 2. 인기 목록 불러오기
  function getMostPopularList() {
    const filter = {
      part: "snippet",
      chart: "mostPopular",
      maxResults: 25,
      regionCode: "KR",
    };
    apiService.getMostPopularList(filter).then((res) => {
      console.log(res);
      setPopularList(res.data.items);
    });
  }

  return (
    <>
      {popularList.length > 0 &&
        popularList.map((videoInfo) => {
          return <ThumbnailCard videoInfo={videoInfo}></ThumbnailCard>;
        })}
    </>
  );
}

export default MostPopularList;
