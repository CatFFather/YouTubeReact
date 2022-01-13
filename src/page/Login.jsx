import React from 'react';
import { Link } from 'react-router-dom';
// CSS
import style from './css/login.module.css';

// COMPONENT
import GoogleLogin from '../components/snsLogin/GoogleLogin';
import GoogleLogout from '../components/snsLogin/GoogleLogout';
import KakaoLogin from '../components/snsLogin/KakaoLogin';

function Login() {
    return (
        <>
            <section className={style.container}>
                <div className={style.wrap}>
                    <Link to="/">
                        <img className={style.logo} src="/images/login_logo.png" />
                    </Link>
                    {/* sns 리스트 */}
                    <ul className={style.snsLoginList}>
                        <li>
                            <GoogleLogin />
                        </li>
                        <li>
                            <KakaoLogin />
                        </li>
                        {/* <li>
                            <GoogleLogout />
                        </li> */}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Login;
