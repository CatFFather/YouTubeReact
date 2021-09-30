import React, { useEffect } from "react";
import { Route, useLocation, useHistory } from "react-router-dom";

// CSS
import style from "./mainLayout.module.css";

// LAYOUT
import Header from "./Header";

// PAGE
import MostPopularList from "../page/MostPopularList"; // 인기 목록
import SearchList from "../page/SearchList"; // 검색 목록
import VideoDetail from "../page/VideoDetail"; // 상세 페이지

// 메인 레이아웃
function MainLayout(props) {
  const location = useLocation();
  const history = useHistory();

  // 시작 시 mostPopularList 로 이동
  useEffect(() => {
    if (location.pathname == "/") {
      history.push("/mostPopularList");
    }
  }, []);

  return (
    <>
      <main className={style.main__container}>
        {/* 상단 검색 search header */}
        <Header></Header>
        {/* 라우팅 될 곳 */}
        <section className={style.main__section}>
          <Route path="/mostPopularList" component={MostPopularList}></Route>
          <Route path="/searchList" component={SearchList}></Route>
          <Route path="/videoDtail/:id" component={VideoDetail}></Route>
        </section>
      </main>
    </>
  );
}

export default MainLayout;
