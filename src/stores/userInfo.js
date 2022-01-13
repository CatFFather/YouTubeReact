import { makeAutoObservable } from "mobx";
import kakaoApiService from "../service/kakaoApiService";
import {
  getAccess_token,
  getLoginSnsInfo,
  localStorage_remove,
} from "../service/localStorageService";

const clientId = process.env.REACT_APP_GOOGLEAUTH_API_ID;

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
      // 카카오 유저 정보 가져오기
      case "kakao":
        // 카카오 서버에 토큰 남아있는지 확인 후 정보 가져오기
        if (!Kakao.Auth.getAccessToken()) {
          console.log("Not logged in.");
          // 서버에 토큰 없으면 로그아웃 처리
          localStorage_remove("access_token");
          localStorage_remove("login_sns");
          return;
        }
        kakaoApiService.kakaoUserInfo({
          success: function (info) {
            console.log("get kakaoUserInfo-success!!", info);
            const loginInfo = {
              login_type: "kakao",
              access_token: Kakao.Auth.getAccessToken(),
              name: info.properties.nickname,
              email: info.kakao_account.email,
              imageUrl: info.properties.thumbnail_image,
            };
            userInfoStore.setUserInfo(loginInfo);
          },
          fail: function (error) {
            console.log("get kakaoUserInfo-fail!!", error);
          },
        });
        break;
      // 구글 유저 정보 가져오기
      case "google":
        gapi.load("auth2", function () {
          /* Ready. Make a call to gapi.auth2.init or some other API */
          gapi.auth2
            .init({
              client_id: clientId,
            })
            .then((auth2) => {
              if (auth2.isSignedIn.get()) {
                const profile = auth2.currentUser.get().getBasicProfile();
                const loginInfo = {
                  login_type: "google",
                  access_token: access_token,
                  name: profile.getName(),
                  email: profile.getEmail(),
                  imageUrl: profile.getImageUrl(),
                };
                userInfoStore.setUserInfo(loginInfo);
              }
            });
        });
        break;
      default:
        console.log("대상이 아님");
    }
  },

  // 로그아웃
  logout() {
    const snsInfo = getLoginSnsInfo();
    if (!snsInfo) {
      return;
    }
    switch (snsInfo) {
      // 카카오 로그아웃
      case "kakao":
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
        localStorage_remove("access_token");
        localStorage_remove("login_sns");
        break;
      // 구글 로그아웃
      case "google":
        const auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then((res) => {
          const resetUserInfo = {
            login_type: null,
            access_token: null,
            name: null,
            email: null,
            imageUrl: null,
          };
          userInfoStore.setUserInfo(resetUserInfo);
          localStorage_remove("access_token");
          localStorage_remove("login_sns");
        });
        break;
      default:
        console.log("로그아웃 대상이 아님");
    }
  },
});

export { userInfoStore };
