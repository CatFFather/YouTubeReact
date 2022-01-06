import React from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import useStroe from '../../stores/useStore';

// CSS
import style from './css/snsLogin.module.css';

function GoogleLoginBtn(props) {
    const { userInfoStore } = useStroe();
    console.log(userInfoStore);

    const history = useHistory();
    const clientId = process.env.REACT_APP_GOOGLEAUTH_API_ID;
    function loginSuccess(res) {
        console.log('구글 로그인 성공!', res);
        const loginInfo = {
            login_type: 'google',
            access_token: res.accessToken,
            name: res.profileObj.name,
            email: res.profileObj.email,
            imageUrl: res.profileObj.imageUrl,
        };
        userInfoStore.setUserInfo(loginInfo);
        // 로그인 후 이전 페이지로 이동
        history.push(history.location.state && history.location.state.prevPath);
    }
    function loginFailure(err) {
        console.log('구글 로그인 실패!', err);
    }

    return (
        <>
            <GoogleLogin
                clientId={clientId}
                onSuccess={loginSuccess}
                onFailure={loginFailure}
                render={(renderProps) => (
                    <button className={`${style.sns_button_common} ${style.google_btn}`} onClick={renderProps.onClick}>
                        <img className={style.sns_logo} src="/images/google_logo.png" />
                        <p className={style.sns_title}>Google로 시작하기</p>
                    </button>
                )}
            />
        </>
    );
}

export default GoogleLoginBtn;
