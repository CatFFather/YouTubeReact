import React from 'react';
import { useGoogleLogout } from 'react-google-login';

function GoogleLoginoutBtn(props) {
    const clientId = '762622649654-1kglmbfg1fgrrt47kjeu846rsamn4srg.apps.googleusercontent.com';

    const { signOut, loaded } = useGoogleLogout({
        onFailure: logoutFailure,
        clientId: clientId,
        onLogoutSuccess: logoutSuccess,
    });
    function logoutSuccess(res) {
        console.log('구글 로그아웃 성공!');
        alert('구글 로그아웃 성공!');
        console.log(res);
    }
    function logoutFailure(err) {
        console.log('구글 로그아웃 실패!');
        alert('구글 로그아웃 실패!');
        console.error(err);
    }

    return (
        <>
            <button onClick={signOut}>구글 로그아웃 테스트(hook) </button>
        </>
    );
}

export default GoogleLoginoutBtn;
