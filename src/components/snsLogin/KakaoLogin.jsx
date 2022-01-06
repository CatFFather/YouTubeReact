import React from 'react';
import { useHistory } from 'react-router-dom';
import useStroe from '../../stores/useStore';

// CSS
import style from './css/snsLogin.module.css';

// SERVICE
import kakaoApiService from '../../service/kakaoApiService';

function KakaoLogin(props) {
    const history = useHistory();
    const { userInfoStore } = useStroe();

    // 카카오 로그인 페이지로 이동(팝업)
    function kakaoLogin() {
        // 로그인 모달창 호출
        kakaoApiService.kakaoLoginPage({
            persistAccessToken: true,
            success: function (login) {
                console.log('login-success!!', login);
                // 로그인 성공 후 로그인 회원정보 가져오기
                kakaoApiService.kakaoUserInfo({
                    success: function (info) {
                        console.log('get kakaoUserInfo-success!!', info);
                        const loginInfo = {
                            login_type: 'kakao',
                            access_token: login.access_token,
                            name: info.properties.nickname,
                            email: info.kakao_account.email,
                            imageUrl: info.properties.thumbnail_image,
                        };
                        userInfoStore.setUserInfo(loginInfo);
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
