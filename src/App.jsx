import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import useStroe from "./stores/useStore";

// CSS
import "./globalStyles.css"; // 전역 스타일 CSS

// LAYOUT
import ScrollToTop from "./util/ScrollToTop"; // 스크롤 상단으로 이동
import MainLayout from "./layout/MainLayout"; // 메인 레이아웃
import Login from "./page/Login";

function App() {
  const { userInfoStore } = useStroe();
  // 카카오 JavaScript 키 초기화
  useEffect(() => {
    const authKey = process.env.REACT_APP_KAKAO_LOGIN_KEY;
    Kakao.init(authKey);
    // SDK 초기화 여부를 판단합니다.(true 일때 사용 가능)
    // console.log('카카오 key 초기화 여부', Kakao.isInitialized());

    // 토큰 판단 하여 로그인 유저 정보 가져오기
    userInfoStore.getUserInfo();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/">
            <ScrollToTop />
            <MainLayout />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
