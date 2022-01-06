import { observable } from 'mobx';

const userInfoStore = observable({
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
});

export { userInfoStore };
