import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        // window.scrollTo(0, 0); --> 이게 먹히지 않아서 mainlayout 에 있는 id='main'의 최상단으로 이동
        document.getElementById('main').scrollTo(0, 0);
    }, [pathname]);

    return null;
}
