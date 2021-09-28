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
            <div>MostPopularList1MostPopularList1MostPopularList1MostPopularList1MostPopularList1MostPopularList1</div>
            <div>MostPopularList2MostPopularList2MostPopularList2MostPopularList2MostPopularList2MostPopularList2</div>
            <div>MostPopularList3MostPopularList3MostPopularList3MostPopularList3MostPopularList3MostPopularList3MostPopularList3</div>
            <div>MostPopularList4MostPopularList4MostPopularList4MostPopularList4MostPopularList4</div>
            <div>MostPopularList5MostPopularList5MostPopularList5MostPopularList5</div>
            <div>MostPopularList6MostPopularList6MostPopularList6MostPopularList6</div>
            <div>
                MostPopularList7MostPopularList7MostPopularList7MostPopularList7MostPopularList7MostPopularList7MostPopularList7MostPopularList7MostPopularList7
            </div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div> <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div> <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div> <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
            <div>MostPopularList</div>
        </>
    );
}

export default MostPopularList;
