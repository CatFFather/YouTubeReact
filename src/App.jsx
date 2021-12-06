import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// CSS
import "./globalStyles.css"; // 전역 스타일 CSS

// LAYOUT
import MainLayout from "./layout/MainLayout"; // 메인 레이아웃

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <MainLayout />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
