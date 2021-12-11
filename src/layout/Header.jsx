import React, { useRef, useState, useEffect } from 'react';
import style from './css/header.module.css';
import { useHistory, useLocation } from 'react-router-dom';

// COMPONENT
import MenuList from './MenuList';
import SearchInputWeb from '../components/search/SearchInputWeb';
import SearchInputMobile from '../components/search/SearchInputMobile';

// 상단 검색 헤더
function Header() {
    const history = useHistory();
    const headerWrap = useRef();
    const [menuOpen, setMenuOpen] = useState(false); // 사이드 메뉴 오픈 여부
    const [mobileSearchModal, setMobileSearchModal] = useState(false); // 모바일 모달창 오픈 여부

    // 윈도우 화면 변화 감지
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 1. 메뉴 아이템 선택
    function handleMenu(path, select) {
        if (select == 'logo') {
            setMenuOpen(false);
        } else {
            setMenuOpen(!menuOpen);
        }
        path && history.push(`/${path}`);
    }

    // 2. 모바일 일때 검색 버튼 클릭
    function mobileSearchModalOpen() {
        headerWrap.current.style.display = 'none';
        setMobileSearchModal(true);
    }

    return (
        <>
            {/* 상단 검색 헤더 */}
            <header ref={headerWrap} className={style.wrap}>
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
                    {windowWidth > 780 ? (
                        <SearchInputWeb />
                    ) : (
                        <button className={style.searchBtn} onClick={mobileSearchModalOpen}>
                            <img src="/images/btn_search.svg" />
                        </button>
                    )}
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

            {/* 모바일 검색시 모달창 호출 */}
            {windowWidth < 780 && <SearchInputMobile ref={headerWrap} mobileSearchModal={mobileSearchModal} setMobileSearchModal={setMobileSearchModal} />}
        </>
    );
}

export default Header;
