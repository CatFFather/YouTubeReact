import React from 'react';
import { useHistory } from 'react-router-dom';

// CSS
import style from './css/snsLogin.module.css';

// SERVICE
import kakaoApiService from '../../service/kakaoApiService';

function KakaoLogin(props) {
    const history = useHistory();

    // 카카오 로그인 페이지로 이동(팝업)
    function kakaoLogin() {
        // 로그인 모달창 호출
        kakaoApiService.kakaoLoginPage({
            success: function (response) {
                console.log('login-success!!', response);
                // 로그인 성공 후 로그인 회원정보 가져오기
                kakaoApiService.kakaoUserInfo({
                    success: function (response) {
                        console.log('get kakaoUserInfo-success!!', response);
                        // 로그인 후 이전 페이지로 이동
                        history.push(history.location.state && history.location.state.prevPath);
                    },
                    fail: function (error) {
                        console.log('get kakaoUserInfo-fail!!', error);
                    },
                });
            },
            fail: function (error) {
                console.log('login-fail!!', error);
            },
        });
    }

    return (
        <>
            <button className={`${style.sns_button_common} ${style.kakao_btn}`} onClick={kakaoLogin}>
                <img className={style.sns_logo} src="/images/kakao_logo.png" />
                <p className={style.sns_title}>카카오로 시작하기</p>
            </button>
        </>
    );
}

export default KakaoLogin;
