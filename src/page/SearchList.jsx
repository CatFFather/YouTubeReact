import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';

// SERVICE
import apiService from '../service/apiService';

// 검색 목록
function SearchList(props) {
    const location = useLocation();
    const [searchList, setSearchList] = useState([]); // api를 통해 얻은 검색 목록
    console.log(searchList);

    // 1. query 변경 시 리스트 갱신
    const query = qs.parse(location.search.replace('?', ''));
    useEffect(() => {
        getSearchList();
    }, [location.search]);

    // 키워드 검색 불러오기
    function getSearchList() {
        const filter = {
            part: 'snippet',
            maxResults: 25,
            q: query.q || '',
        };
        apiService.getSearchList(filter).then((res) => {
            console.log(res);
            setSearchList(res.data.items);
        });
    }

    return (
        <>
            {searchList.length > 0 &&
                searchList.map((item) => {
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

export default SearchList;
