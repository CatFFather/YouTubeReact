import React, { useState, useEffect } from 'react';

// COMPONENT
import ThumbnailCard from '../components/card/VideoInfoCard';

// SERVICE
import apiService from '../service/apiService';

// 인기 목록
function MostPopularList(props) {
    const [popularList, setPopularList] = useState([]); // 인기 목록 + 채널 썸네일
    let videoInfos = []; // 인기 목록 임시 저장

    // 1. 첫 랜더링 시 목록 불러오기
    useEffect(() => {
        getMostPopularList();
    }, []);

    // 2. 인기 목록 불러오기
    function getMostPopularList() {
        const filter = {
            part: 'snippet',
            chart: 'mostPopular',
            maxResults: 15,
            regionCode: 'KR',
        };
        apiService.getMostPopularList(filter).then((res) => {
            videoInfos = res.data.items; // api 호출하여 받은 인기목록 videoInfos 변수에 임시 저장
            getChannelsInfo(); // 인기목록의 채널 id를 이용하여 채널 정보 불러오기
        });
    }

    // 3. 채널 정보 불러오기
    function getChannelsInfo() {
        // 채널 id를 arr 형태로 보내줘야함
        const channelIdArr = videoInfos.map((item) => {
            return item.snippet.channelId;
        });
        console.log('channelIdArr', channelIdArr);

        const filter = {
            part: 'snippet',
            maxResults: 15,
            id: channelIdArr,
        };
        apiService.getChannelsInfo(filter).then((res) => {
            // indexOf를 이용하여 인기 목록의 순서로 정렬해주기
            let newChannelsInfoList = [];
            res.data.items.forEach((item, index) => {
                console.log('index', index);
                console.log('item.id', item.id);
                console.log('channelIdArr.indexOf(itme.id)', channelIdArr.indexOf(item.id));
                newChannelsInfoList[channelIdArr.indexOf(item.id)] = item;
                // newChannelsInfoList.push(res.data.items[channelIdArr.indexOf(item.id)]);
            });
            console.log('newChannelsInfoList', newChannelsInfoList);
            // 인기 목록 + 채널 썸네일 state에 저장 할 새로운 arr 생성 // TODO 채널 정보 불러올 때 채널 id 동일 이슈 발생
            const newPopularList = videoInfos.map((item, index) => {
                item.snippet.channelThumbnails = newChannelsInfoList[index].snippet.thumbnails;
                return item;
            });
            setPopularList(newPopularList); // 인기 목록 + 채널 썸네일 state에 저장
        });
    }

    return (
        <>
            {popularList.length > 0 &&
                popularList.map((videoInfo, index) => {
                    return <ThumbnailCard key={videoInfo.id} videoInfo={videoInfo}></ThumbnailCard>;
                })}
        </>
    );
}

export default MostPopularList;
