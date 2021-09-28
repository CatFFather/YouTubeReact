import React, { useState, useEffect } from 'react';

// SERVICE
import apiService from '../service/apiService';

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
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 25,
        };
        apiService.getMostPopularList(filter).then((res) => {
            console.log(res);
            setPopularList(res.data.items);
        });
    }

    return (
        <>
            {popularList.length > 0 &&
                popularList.map((item) => {
                    return (
                        <img
                            src={item && item.snippet.thumbnails.medium.url}
                            width={item && item.snippet.thumbnails.medium.width}
                            height={item && item.snippet.thumbnails.medium.height}
                        ></img>
                    );
                })}
        </>
    );
}

export default MostPopularList;
