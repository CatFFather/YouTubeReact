import { makeAutoObservable } from 'mobx';
import kakaoApiService from '../service/kakaoApiService';
import { getAccess_token, getLoginSnsInfo, localStorage_remove } from '../service/localStorageService';

const userInfoStore = makeAutoObservable({
    // 로그인 유저 정보
    userInfo: {
        login_type: null,
        access_token: null,
        name: null,
        email: null,
        imageUrl: null,
    },
    // 유저 정보 등록 함수
    setUserInfo(data) {
        for (const key in userInfoStore.userInfo) {
            userInfoStore.userInfo[key] = data[key];
        }
    },
    // 토큰이 있을 때 유저 정보 가져오기
    getUserInfo() {
        const access_token = getAccess_token();
        const snsInfo = getLoginSnsInfo();
        if (!snsInfo) {
            return;
        }
        switch (snsInfo) {
            case 'kakao':
                // 카카오 서버에 토큰 남아있는지 확인 후 정보 가져오기
                if (!Kakao.Auth.getAccessToken()) {
                    console.log('Not logged in.');
                    // 서버에 토큰 없으면 로그아웃 처리
                    localStorage_remove('access_token');
                    localStorage_remove('login_sns');
                    return;
                }
                kakaoApiService.kakaoUserInfo({
                    success: function (info) {
                        console.log('get kakaoUserInfo-success!!', info);
                        const loginInfo = {
                            login_type: 'kakao',
                            access_token: Kakao.Auth.getAccessToken(),
                            name: info.properties.nickname,
                            email: info.kakao_account.email,
                            imageUrl: info.properties.thumbnail_image,
                        };
                        userInfoStore.setUserInfo(loginInfo);
                    },
                    fail: function (error) {
                        console.log('get kakaoUserInfo-fail!!', error);
                    },
                });
                break;
            case 'google':
                console.log('구글 유저 정보 가져오기');
                break;
            default:
                console.log('대상이 아님');
        }
    },

    // 로그아웃
    logout() {
        const snsInfo = getLoginSnsInfo();
        if (!snsInfo) {
            return;
        }
        switch (snsInfo) {
            case 'kakao':
                console.log('카카오 로그아웃');
                kakaoApiService.kakaoLogout(() => {
                    const resetUserInfo = {
                        login_type: null,
                        access_token: null,
                        name: null,
                        email: null,
                        imageUrl: null,
                    };
                    userInfoStore.setUserInfo(resetUserInfo);
                });
                localStorage_remove('access_token');
                localStorage_remove('login_sns');
                break;
            case 'google':
                console.log('구글 로그아웃');
                break;
            default:
                console.log('로그아웃 대상이 아님');
        }
    },
});

export { userInfoStore };
