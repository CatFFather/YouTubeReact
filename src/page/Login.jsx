import React, { useEffect } from 'react';

// CSS
import style from './css/login.module.css';

// SERVICE
import kakaoApiService from '../service/kakaoApiService';

function Login(props) {
    // 카카오 로그인 페이지로 이동(팝업)
    function kakaoLogin() {
        kakaoApiService.kakaoLoginPage();
    }

    // 카카오 JavaScript 키 초기화
    useEffect(() => {
        const authKey = process.env.REACT_APP_KAKAO_LOGIN_KEY;
        Kakao.init(authKey);
        // SDK 초기화 여부를 판단합니다.(true 일때 사용 가능)
        console.log('카카오 key 초기화 여부', Kakao.isInitialized());
    }, []);
    return (
        <>
            <section className={style.container}>
                <div className={style.wrap}>
                    <div>main Image onClick</div>
                    <ul>
                        <li>구글</li>
                        <li onClick={kakaoLogin}>카카오</li>
                        {/* <li onClick={kakaoLogin}>
                            <img src="/images/kakao_login.png" />
                        </li> */}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Login;
