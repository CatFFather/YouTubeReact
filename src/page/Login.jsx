import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// CSS
import style from './css/login.module.css';

// SERVICE
import kakaoApiService from '../service/kakaoApiService';

function Login(props) {
    const history = useHistory();

    // 카카오 로그인 페이지로 이동(팝업)
    function kakaoLogin() {
        kakaoApiService.kakaoLoginPage({
            success: function (response) {
                console.log('login', response);

                kakaoApiService.kakaoUserInfo({
                    success: function (response) {
                        console.log('kakaoUserInfo', response);
                        // 로그인 후 이동
                        history.push('/mostPopularList');
                    },
                    fail: function (error) {
                        console.log(error);
                    },
                });
            },
            fail: function (error) {
                console.log(error);
            },
        });
    }

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
