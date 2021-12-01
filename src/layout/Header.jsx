import React, { useRef, useState, useEffect } from 'react';
import style from './header.module.css';
import { useHistory, useLocation } from 'react-router-dom';

// 상단 검색 헤더
function Header() {
    const history = useHistory();
    const location = useLocation();
    const keyWord = useRef(); // ref 를 이용한 keyWord 관리
    const menuAsideWrap = useRef(); // 왼쪽 사이드 메뉴 wrap
    const menuAside = useRef(); // 왼쪽 사이드 메뉴
    const menuAsideBackground = useRef(); // 왼쪽 사이드 메뉴 뒷 배경

    const [menuOpen, setMenuOpen] = useState(false); // 사이드 메뉴 오픈 여부
    const [searchCount, setSearchCount] = useState(0); // 검색 횟수 (같은 키워드로 검색 시 location.search 변화를 주기 위함) --> TODO 유지 할지 지울지 고민해보기

    // 1. 검색 시 searchList로 이동 --> 쿼리를 이용 하여 파라미터 보내주기
    function search() {
        if (keyWord.current.value == (null || '')) return;
        history.push(`/searchList?q=${keyWord.current.value}&searchCount=${searchCount}`);
        keyWord.current.value = ''; // 값 초기화
        setSearchCount(searchCount + 1);
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
    function selectMenu(path) {
        history.push(`/${path}`);
        setMenuOpen(!menuOpen);
    }

    return (
        <>
            <header className={style.wrap}>
                <div className={style.headerLeft}>
                    <img className={style.menuBtn} src="/images/menu.png" onClick={clickMenuBtn} />
                    <img
                        className={style.logo}
                        src="/images/logo.png"
                        onClick={() => {
                            selectMenu('mostPopularList');
                        }}
                    />
                </div>
                <div className={style.headerCenter}>
                    <input
                        ref={keyWord}
                        className={style.searchInput}
                        type="text"
                        placeholder="검색"
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
                <div className={style.headerRight}>
                    <div>아이템1</div>
                    <div>아이템2</div>
                </div>
            </header>
            <aside ref={menuAsideWrap} className={style.menuAsideWrap}>
                <div ref={menuAside} className={style.menuAside}>
                    <div
                        className={`${location.pathname == '/mostPopularList' ? [style.menuItemWrap, style.menuItemWrapBg].join(' ') : style.menuItemWrap}`}
                        onClick={() => {
                            selectMenu('mostPopularList');
                        }}
                    >
                        <div className={style.menuItemImg}>이미지</div>
                        <div>홈</div>
                    </div>
                    <div
                        className={`${location.pathname == '/searchList' ? [style.menuItemWrap, style.menuItemWrapBg].join(' ') : style.menuItemWrap}`}
                        onClick={() => {
                            selectMenu('searchList');
                        }}
                    >
                        <div className={style.menuItemImg}>이미지</div>
                        <div>탐색</div>
                    </div>
                    <div className={style.menuItemWrap}>
                        <div className={style.menuItemImg}>이미지</div>
                        <div>구독</div>
                    </div>
                    <div className={style.menuItemWrap}>
                        <div className={style.menuItemImg}>이미지</div>
                        <div>Originals</div>
                    </div>
                </div>
                <div ref={menuAsideBackground} className={style.menuAsideBackground} onClick={clickMenuBtn}></div>
            </aside>
        </>
    );
}

export default Header;
