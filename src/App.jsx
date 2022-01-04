import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// CSS
import './globalStyles.css'; // 전역 스타일 CSS

// LAYOUT
import ScrollToTop from './util/ScrollToTop'; // 스크롤 상단으로 이동
import MainLayout from './layout/MainLayout'; // 메인 레이아웃
import Login from './page/Login';

function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact>
                        <ScrollToTop />
                        <MainLayout />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
