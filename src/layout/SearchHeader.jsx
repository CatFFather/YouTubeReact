import React from "react";
import style from "./SearchHeader.module.css";

function SearchHeader(props) {
  return (
    <header className={style.wrap}>
      <div className={style.headerLeft}>
        <img className={style.menu} src="/images/menu.png" />
        <img src="/images/logo.png" />
      </div>
      <div className={style.headerCenter}>
        <input
          className={style.searchInput}
          type="text"
          placeholder="검색"
        ></input>
        <button className={style.searchBtn}>
          <img src="/images/btn_search.svg" />
        </button>
      </div>
      <div className={style.headerRight}>
        <div>아이템1</div>
        <div>아이템2</div>
      </div>
    </header>
  );
}

export default SearchHeader;
