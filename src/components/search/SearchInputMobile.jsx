import React, { useRef, useState, useEffect } from 'react';
import style from './css/searchInputMobile.module.css';
import { useHistory } from 'react-router-dom';

// 상단 검색 헤더
const SearchInputMobile = React.forwardRef((props, ref) => {
    const { mobileSearchModal, setMobileSearchModal } = props;
    const history = useHistory();
    const keyWord = useRef(); // ref 를 이용한 keyWord 관리

    const [searchCount, setSearchCount] = useState(0); // 검색 횟수 (같은 키워드로 검색 시 location.search 변화를 주기 위함)

    const [latelySearchList, setLatelySearchList] = useState(JSON.parse(localStorage.getItem('latelySearchList') || '[]')); // 최근 검색어

    // 1. 검색 시 searchList로 이동 --> 쿼리를 이용 하여 파라미터 보내주기
    function search() {
        keyWord.current.blur();
        if (keyWord.current.value == (null || '')) return;
        // 최근 검색에 저장 (중복되는 keyWord는 삭제)
        const previousLatelySearchList = latelySearchList.filter((latelySearch) => {
            return latelySearch.keyWord != keyWord.current.value;
        });
        const newLatelySearch = {
            seq: new Date(),
            keyWord: keyWord.current.value,
        };
        setLatelySearchList([newLatelySearch, ...previousLatelySearchList]);
        // searchList 로 이동
        history.push(`/searchList?q=${keyWord.current.value}&searchCount=${searchCount}`);
        keyWord.current.value = ''; // 값 초기화
        setSearchCount(searchCount + 1); // 검색 횟수 증가
        closeModal();
    }

    // 3. 최근 검색어로 재검색
    function latelySearch(itemKeyWord) {
        keyWord.current.value = itemKeyWord;
        search();
    }

    // 4. 최근 검색어 삭제
    function latelySearchDelete(deleteKeyWord) {
        // 최근 검색에 저장 (중복되는 keyWord는 삭제)
        const previousLatelySearchList = latelySearchList.filter((latelySearch) => {
            return latelySearch.keyWord != deleteKeyWord;
        });
        setLatelySearchList(previousLatelySearchList);
    }

    // 5. latelySearchList 변경시 localStorage 에 저장
    useEffect(() => {
        console.log('latelySearchList저장!!!', latelySearchList);
        localStorage.setItem('latelySearchList', JSON.stringify(latelySearchList));
    }, [latelySearchList]);

    // 모달창 닫기
    function closeModal() {
        ref.current.style.display = '';
        setMobileSearchModal(false);
    }

    return (
        <>
            {mobileSearchModal && (
                <div className={style.searchInputModal}>
                    <div className={style.searchInputWrap}>
                        <i className="fas fa-arrow-left" onClick={closeModal}></i>
                        <input
                            ref={keyWord}
                            className={style.searchInput}
                            autoComplete="off"
                            type="text"
                            placeholder="YouTube 검색"
                            onKeyUp={(e) => {
                                if (e.keyCode == 13) {
                                    search();
                                }
                            }}
                        ></input>

                        <button className={style.searchBtn} onClick={search}>
                            <img src="/images/btn_search.svg" />
                        </button>
                    </div>
                    {/* 최근 검색어 */}
                    <div className={style.latelySearchListWrap}>
                        {latelySearchList.map((item, index) => {
                            return (
                                <React.Fragment key={item.seq}>
                                    {index < 10 && (
                                        <div
                                            className={style.latelySearch}
                                            onClick={(e) => {
                                                latelySearch(item.keyWord);
                                            }}
                                        >
                                            <span className={style.latelySearchKeyWord}>{item.keyWord}</span>
                                            <span
                                                className={style.latelySearchDelete}
                                                onClick={(e) => {
                                                    latelySearchDelete(item.keyWord);
                                                    e.stopPropagation(); // 이벤트 버블링 방지
                                                }}
                                            >
                                                삭제
                                            </span>
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
});

export default SearchInputMobile;
