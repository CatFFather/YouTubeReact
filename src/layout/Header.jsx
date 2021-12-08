import React, { useRef, useState, useEffect } from 'react';
import style from './header.module.css';
import { useHistory, useLocation } from 'react-router-dom';

// COMPONENT
import MenuList from './MenuList';

// 상단 검색 헤더
function Header() {
    const history = useHistory();
    const keyWord = useRef(); // ref 를 이용한 keyWord 관리
    const latelySearchListWrap = useRef(); // 최근검색어 wrap

    const [menuOpen, setMenuOpen] = useState(false); // 사이드 메뉴 오픈 여부
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
    }
    // 2. 메뉴 아이템 선택
    function handleMenu(path, select) {
        if (select == 'logo') {
            setMenuOpen(false);
        } else {
            setMenuOpen(!menuOpen);
        }
        path && history.push(`/${path}`);
    }

    // 검색창 클릭했을 때 focus 이벤트 발생 , 벗어나면 blur 발생
    function inputOnFocus() {
        latelySearchListWrap.current.style.opacity = '1';
        latelySearchListWrap.current.style.pointerEvents = 'auto';
    }
    function inputOnBlur() {
        latelySearchListWrap.current.style.opacity = '0';
        latelySearchListWrap.current.style.pointerEvents = 'none';
    }

    // 최근 검색어로 재검색
    function latelySearch(itemKeyWord) {
        keyWord.current.value = itemKeyWord;
        search();
    }

    // 최근 검색어 삭제
    function latelySearchDelete(deleteKeyWord) {
        // 최근 검색에 저장 (중복되는 keyWord는 삭제)
        const previousLatelySearchList = latelySearchList.filter((latelySearch) => {
            return latelySearch.keyWord != deleteKeyWord;
        });
        setLatelySearchList(previousLatelySearchList);
    }

    // latelySearchList 변경시 localStorage 에 저장
    useEffect(() => {
        localStorage.setItem('latelySearchList', JSON.stringify(latelySearchList));
    }, [latelySearchList]);

    return (
        <>
            {/* 상단 검색 헤더 */}
            <header className={style.wrap}>
                <div className={style.headerLeft}>
                    <img
                        className={style.menuBtn}
                        src="/images/menu.png"
                        onClick={() => {
                            handleMenu();
                        }}
                    />
                    <img
                        className={style.logo}
                        src="/images/logo.png"
                        onClick={() => {
                            handleMenu('mostPopularList', 'logo');
                        }}
                    />
                </div>
                <div className={style.headerCenter}>
                    <div className={style.searchInputWrap}>
                        <input
                            ref={keyWord}
                            className={style.searchInput}
                            autoComplete="off"
                            onFocus={inputOnFocus}
                            onBlur={inputOnBlur}
                            type="text"
                            placeholder="검색"
                            onKeyUp={(e) => {
                                if (e.keyCode == 13) {
                                    search();
                                }
                            }}
                        ></input>
                        {/* 최근 검색어 */}
                        <div ref={latelySearchListWrap} className={style.latelySearchListWrap}>
                            {latelySearchList.map((item, index) => {
                                return (
                                    <React.Fragment key={item.seq}>
                                        {index < 10 && (
                                            <div
                                                className={style.latelySearch}
                                                onMouseDown={(e) => {
                                                    e.preventDefault(); // onBlur 방지
                                                }}
                                                onClick={(e) => {
                                                    latelySearch(item.keyWord);
                                                }}
                                            >
                                                <span
                                                    className={style.latelySearchKeyWord}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault(); // onBlur 방지
                                                    }}
                                                    onClick={(e) => {
                                                        latelySearch(item.keyWord);
                                                        e.stopPropagation(); // 이벤트 버블링 방지
                                                    }}
                                                >
                                                    {item.keyWord}
                                                </span>
                                                <span
                                                    className={style.latelySearchDelete}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault(); // onBlur 방지
                                                    }}
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

                    <button className={style.searchBtn} onClick={search}>
                        <img src="/images/btn_search.svg" />
                    </button>
                </div>
                <div className={style.headerRight}>
                    <button className={style.loginBtn}>
                        <i className="far fa-user-circle"></i>
                        <span>로그인</span>
                    </button>
                </div>
            </header>
            {/* 메뉴 목록 */}
            <MenuList
                menuOpen={menuOpen} // 메뉴 오픈 여부
                handleMenu={handleMenu} // 메뉴 아이템 선택 함수
            />
        </>
    );
}

export default Header;
