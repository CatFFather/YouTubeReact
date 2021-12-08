import React, { useRef, useState, useEffect } from 'react';
import style from './header.module.css';
import { useHistory, useLocation } from 'react-router-dom';
// 메뉴 이미지 https://fonts.google.com/icons 에서 참고

// 상단 검색 헤더
function Header() {
    const history = useHistory();
    const location = useLocation();
    const keyWord = useRef(); // ref 를 이용한 keyWord 관리
    const menuAsideWrap = useRef(); // 왼쪽 사이드 메뉴 wrap
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
    // 2. 메뉴 버튼 클릭 시 사이드 메뉴 활성화
    function clickMenuBtn() {
        setMenuOpen(!menuOpen);
    }
    // menuOpen 에 따른 분기처리
    useEffect(() => {
        if (menuOpen == true) {
            menuAsideWrap.current.style.opacity = 1;
            menuAsideWrap.current.style.pointerEvents = 'auto';
        } else {
            menuAsideWrap.current.style.opacity = 0;
            menuAsideWrap.current.style.pointerEvents = 'none';
        }
    }, [menuOpen]);

    // 3. 메뉴 아이템 선택
    function selectMenu(path, select) {
        if (select == 'logo') {
            setMenuOpen(false);
        } else {
            setMenuOpen(!menuOpen);
        }
        history.push(`/${path}`);
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
                    <img className={style.menuBtn} src="/images/menu.png" onClick={clickMenuBtn} />
                    <img
                        className={style.logo}
                        src="/images/logo.png"
                        onClick={() => {
                            selectMenu('mostPopularList', 'logo');
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
            {/* 사이드 메뉴 전체*/}
            <aside ref={menuAsideWrap} className={style.menuAsideWrap}>
                {/* 왼쪽 메뉴 부분 */}
                <div className={style.menuAside}>
                    <div
                        className={`${location.pathname == '/mostPopularList' ? `${style.menuItemWrap} ${style.menuItemWrapBg}` : style.menuItemWrap}`}
                        onClick={() => {
                            selectMenu('mostPopularList');
                        }}
                    >
                        <img
                            className={style.menuItemImg}
                            src={`${location.pathname == '/mostPopularList' ? '/images/home_filled.svg' : '/images/home_outlined.svg'}`}
                        />
                        <div>홈</div>
                    </div>
                    <div
                        className={`${location.pathname == '/searchList' ? `${style.menuItemWrap} ${style.menuItemWrapBg}` : style.menuItemWrap}`}
                        onClick={() => {
                            selectMenu('searchList');
                        }}
                    >
                        <img
                            className={style.menuItemImg}
                            src={`${location.pathname == '/searchList' ? '/images/explore_filled.svg' : '/images/explore_outlined.svg'}`}
                        />
                        <div>탐색</div>
                    </div>
                    <div className={style.menuItemWrap}>
                        <img className={style.menuItemImg} src="/images/subscriptions_outlined.svg" />
                        <div>구독</div>
                    </div>
                    {/* <div className={style.menuItemWrap}>
                        <div className={style.menuItemImg}>이미지</div>
                        <div>Originals</div>
                    </div> */}
                </div>
                {/* 오른쪽 검은 배경 */}
                <div className={style.menuAsideBackground} onClick={clickMenuBtn}></div>
            </aside>
        </>
    );
}

export default Header;
