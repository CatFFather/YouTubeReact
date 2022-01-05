import React from 'react';
import { GoogleLogin } from 'react-google-login';

function GoogleLoginBtn(props) {
    const clientId = '762622649654-1kglmbfg1fgrrt47kjeu846rsamn4srg.apps.googleusercontent.com';
    function loginSuccess(res) {
        console.log('구글 로그인 성공!');
        alert('구글 로그인 성공!');
        console.log(res);
    }
    function loginFailure(err) {
        console.log('구글 로그인 실패!');
        alert('구글 로그인 실패!');
        console.error(err);
    }
    return (
        <>
            <GoogleLogin clientId={clientId} buttonText="Google로 로그인" onSuccess={loginSuccess} onFailure={loginFailure} />
        </>
    );
}

export default GoogleLoginBtn;
