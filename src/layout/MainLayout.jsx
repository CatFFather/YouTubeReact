import React, { useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

// LAYOUT
import SearchHeader from "./SearchHeader";

// PAGE
import MostPopularList from "../page/MostPopularList";
import SearchList from "../page/SearchList";

// 메인 레이아웃
function MainLayout(props) {
  const location = useLocation();
  const history = useHistory();

  // 기본 mostPopularList 로 이동
  useEffect(() => {
    console.log(location);
    if (location.pathname == "/") {
      console.log("path가 / 일때");
      history.push("/mostPopularList");
    }
  }, []);

  return (
    <>
      <main className="main__container">
        {/* 상단 검색 search header */}
        <SearchHeader></SearchHeader>

        {/* 라우팅 될 곳 */}
        <section>
          <Switch>
            <Route path="/mostPopularList" component={MostPopularList}></Route>
            <Route path="/searchList" component={SearchList}></Route>
          </Switch>
        </section>
      </main>
    </>
  );
}

export default MainLayout;
