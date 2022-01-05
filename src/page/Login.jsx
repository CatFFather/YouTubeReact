import React from 'react';

// CSS
import style from './css/login.module.css';

// COMPONENT
import GoogleLogin from '../components/snsLogin/GoogleLogin';
import GoogleLogout from '../components/snsLogin/GoogleLogout';
import KakaoLogin from '../components/snsLogin/KakaoLogin';

function Login(props) {
    return (
        <>
            <section className={style.container}>
                <div className={style.wrap}>
                    <div>main Image onClick</div>
                    <ul>
                        <li>
                            <GoogleLogin />
                        </li>
                        <li>
                            <GoogleLogout />
                        </li>
                        <li>
                            <KakaoLogin />
                        </li>
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Login;
