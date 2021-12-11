import React, { useRef, useEffect } from 'react';
import style from './css/menuList.module.css';
// 메뉴 이미지 https://fonts.google.com/icons 에서 참고

/**
 *
 * @param {*} menuOpen  메뉴 오픈 여부
 * @param {*} handleMenu 메뉴 아이템 선택 함수
 * @returns
 */
// 메뉴 리스트
function MenuList(props) {
    const { menuOpen, handleMenu } = props;
    const menuAsideWrap = useRef(); // 왼쪽 사이드 메뉴 wrap

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

    return (
        <>
            {/* 메뉴 전체 목록 */}
            <aside ref={menuAsideWrap} className={style.menuAsideWrap}>
                {/* 왼쪽 메뉴 부분 */}
                <ul className={style.menuAside}>
                    <li
                        className={`${location.pathname == '/mostPopularList' ? `${style.menuItemWrap} ${style.menuItemWrapBg}` : style.menuItemWrap}`}
                        onClick={() => {
                            handleMenu('mostPopularList');
                        }}
                    >
                        <img
                            className={style.menuItemImg}
                            src={`${location.pathname == '/mostPopularList' ? '/images/home_filled.svg' : '/images/home_outlined.svg'}`}
                        />
                        <div>홈</div>
                    </li>
                    <li
                        className={`${location.pathname == '/searchList' ? `${style.menuItemWrap} ${style.menuItemWrapBg}` : style.menuItemWrap}`}
                        onClick={() => {
                            handleMenu('searchList');
                        }}
                    >
                        <img
                            className={style.menuItemImg}
                            src={`${location.pathname == '/searchList' ? '/images/explore_filled.svg' : '/images/explore_outlined.svg'}`}
                        />
                        <div>탐색</div>
                    </li>
                    <li className={style.menuItemWrap}>
                        <img className={style.menuItemImg} src="/images/subscriptions_outlined.svg" />
                        <div>구독</div>
                    </li>
                    {/* <div className={style.menuItemWrap}>
                        <div className={style.menuItemImg}>이미지</div>
                        <div>Originals</div>
                    </div> */}
                </ul>
                {/* 오른쪽 검은 배경 */}
                <div
                    className={style.menuAsideBackground}
                    onClick={() => {
                        handleMenu();
                    }}
                ></div>
            </aside>
        </>
    );
}

export default MenuList;
