import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

// CSS
import style from './searchList.module.css';

// COMPONENT
import SearchListCard from '../components/card/SearchListCard';
import ChannelInfoCard from '../components/card/ChannelInfoCard';

// SERVICE
import apiService from '../service/apiService';

// UTIL
import { getAllIndexes } from '../util/util';

// 검색 목록
function SearchList(props) {
    const [ref, inView] = useInView();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [searchList, setSearchList] = useState([]); // api를 통해 얻은 검색 목록
    const [nextPageToken, setNextPageToken] = useState(null); // 검색 목록 페이지 토큰

    // 1. query 변경 시 리스트 갱신
    const query = qs.parse(location.search.replace('?', ''));
    useEffect(() => {
        if (location.search == (null || '')) {
            setSearchList([]);
        } else {
            getSearchList('initSearch');
        }
    }, [location.search]);

    // 키워드 검색 불러오기
    function getSearchList(type) {
        setLoading(true);
        const filter = {
            part: 'snippet',
            maxResults: 25,
            q: query.q,
        };
        type == 'initSearch' ? '' : (filter.pageToken = nextPageToken);
        apiService.getSearchList(filter).then((res) => {
            setNextPageToken(res.data.nextPageToken);
            let videoInfos = []; // 검색 목록
            videoInfos = res.data.items; // api 호출하여 받은 검색목록 videoInfos 변수에 저장
            getChannelsInfo(videoInfos, type); // 검색목록의 채널 id를 이용하여 채널 정보 불러오기
        });
    }

    // 3. 채널 정보 불러오기
    function getChannelsInfo(videoInfos, type) {
        // 채널 id를 arr 형태로 보내줘야함
        const channelIdArr = videoInfos.map((item) => {
            return item.snippet.channelId;
        });

        const filter = {
            part: 'snippet',
            maxResults: 25,
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
                item.snippet.channelThumbnails = newChannelsInfoList[index].snippet.thumbnails;
                return item;
            });
            // 타입에 따라 분기하여 검색 목록 + 채널 썸네일 state에 저장
            if (type == 'initSearch') {
                setSearchList([...newSearchList]);
            } else if (type == 'paging') {
                setSearchList([...searchList, ...newSearchList]);
            }
            setLoading(false);
        });
    }

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            getSearchList('paging');
        }
    }, [inView, loading]);

    // 페이징 처리를 위한 ref 분기 처리 , videoInfo.id.kind 의 종류에 따른 컴포넌트 분기처리
    return (
        <div className={style.searchList}>
            {searchList.length > 0 ? (
                searchList.map((videoInfo, index) => {
                    return (
                        <>
                            {searchList.length - 1 == index ? (
                                <>
                                    {videoInfo.id.kind == 'youtube#channel' ? (
                                        <div ref={ref}>
                                            <ChannelInfoCard key={videoInfo.id.channelId} channelInfo={videoInfo} />
                                        </div>
                                    ) : (
                                        <div ref={ref}>
                                            <SearchListCard key={videoInfo.id.videoId} videoInfo={videoInfo}></SearchListCard>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    {videoInfo.id.kind == 'youtube#channel' ? (
                                        <div>
                                            <ChannelInfoCard key={videoInfo.id.channelId} channelInfo={videoInfo} />
                                        </div>
                                    ) : (
                                        <div>
                                            <SearchListCard key={videoInfo.id.videoId} videoInfo={videoInfo}></SearchListCard>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    );
                })
            ) : (
                <>
                    <div className={style.searchListLengthZero}>
                        <img src="/images/btn_search.svg" />
                        <p>상단에서 검색 해보세요!</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default SearchList;
