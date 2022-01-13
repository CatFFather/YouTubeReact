import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import useStroe from "../../stores/useStore";
import {
  setAccess_token,
  setLoginSnsInfo,
} from "../../service/localStorageService";

// CSS
import style from "./css/snsLogin.module.css";

function GoogleLoginBtn(props) {
  const { userInfoStore } = useStroe();

  const history = useHistory();
  const clientId = process.env.REACT_APP_GOOGLEAUTH_API_ID;
  function loginSuccess(res) {
    console.log("구글 로그인 성공!", res);
    const loginInfo = {
      login_type: "google",
      access_token: res.getAuthResponse(true).access_token,
      name: res.getBasicProfile().getName(),
      email: res.getBasicProfile().getEmail(),
      imageUrl: res.getBasicProfile().getImageUrl(),
    };
    userInfoStore.setUserInfo(loginInfo);
    setLoginSnsInfo(loginInfo.login_type);
    setAccess_token(res.getAuthResponse(true).access_token);
    // 로그인 후 이전 페이지로 이동
    history.push(history.location.state && history.location.state.prevPath);
  }
  function loginFailure(err) {
    console.log("구글 로그인 실패!", err);
  }
  function renderButton() {
    gapi.signin2.render("google-login-btn", {
      scope: "profile",
      width: 300,
      height: 45,
      longtitle: true,
      onsuccess: loginSuccess,
      onfailure: loginFailure,
    });
  }
  useEffect(() => {
    renderButton();
  }, []);

  return (
    <>
      {/* <GoogleLogin
                clientId={clientId}
                onSuccess={loginSuccess}
                onFailure={loginFailure}
                render={(renderProps) => (
                    <button className={`${style.sns_button_common} ${style.google_btn}`} onClick={renderProps.onClick}>
                        <img className={style.sns_logo} src="/images/google_logo.png" />
                        <p className={style.sns_title}>Google로 시작하기</p>
                    </button>
                )}
            /> */}
      {/* <button className={`${style.sns_button_common} ${style.google_btn}`}>
        <img className={style.sns_logo} src="/images/google_logo.png" />
        <p className={style.sns_title}>Google로 시작하기</p>
      </button> */}
      <div id="google-login-btn"></div>
    </>
  );
}

export default GoogleLoginBtn;
