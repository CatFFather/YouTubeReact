import React, { useRef, useState } from 'react';
import style from './header.module.css';
import { useHistory } from 'react-router-dom';

// 상단 검색 헤더
function Header() {
    const history = useHistory();
    const keyWord = useRef(); // ref 를 이용한 keyWord 관리

    const [searchCount, setSearchCount] = useState(0); // 검색 횟수 (같은 키워드로 검색 시 location.search 변화를 주기 위함) --> TODO 유지 할지 지울지 고민해보기

    // 검색 시 searchList로 이동 --> 쿼리를 이용 하여 파라미터 보내주기
    function search() {
        if (keyWord.current.value == (null || '')) return;
        history.push(`/searchList?q=${keyWord.current.value}&searchCount=${searchCount}`);
        keyWord.current.value = ''; // 값 초기화
        setSearchCount(searchCount + 1);
    }

    // 로고 클릭 시 인기 목록으로 이동
    function goToMostPopularList() {
        history.push(`/mostPopularList`);
    }
    return (
        <>
            <header className={style.wrap}>
                <div className={style.headerLeft}>
                    <img className={style.menuBtn} src="/images/menu.png" />
                    <img className={style.logo} src="/images/logo.png" onClick={goToMostPopularList} />
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
            {/* <aside>사이드 메뉴 활성화</aside> */}
        </>
    );
}

export default Header;
