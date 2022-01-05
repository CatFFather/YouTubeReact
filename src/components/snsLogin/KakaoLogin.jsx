import React from 'react';
import { useHistory } from 'react-router-dom';

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
                        // 로그인 후 이동
                        history.push('/mostPopularList');
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
            <img onClick={kakaoLogin} src="/images/kakao_login.png" />
        </>
    );
}

export default KakaoLogin;
