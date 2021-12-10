import React, { useRef, useState, useEffect } from 'react';
import style from './css/header.module.css';
import { useHistory, useLocation } from 'react-router-dom';

// COMPONENT
import MenuList from './MenuList';
import SearchInput from './SearchInput';

// 상단 검색 헤더
function Header() {
    const history = useHistory();
    const [menuOpen, setMenuOpen] = useState(false); // 사이드 메뉴 오픈 여부

    // 1. 메뉴 아이템 선택
    function handleMenu(path, select) {
        if (select == 'logo') {
            setMenuOpen(false);
        } else {
            setMenuOpen(!menuOpen);
        }
        path && history.push(`/${path}`);
    }

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
                    <SearchInput />
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
