import React, { useEffect, useRef } from 'react';
import useStroe from '../stores/useStore';
import style from './css/userInfoMenu.module.css';

function UserInfoMenu(props) {
    const userInfowrap = useRef();
    const { handleInfoMenu } = props;
    const { userInfoStore } = useStroe();

    // 로그아웃
    function logout() {
        userInfoStore.logout();
        handleInfoMenu();
    }
    useEffect(() => {
        window.addEventListener('click', handleCloseModal);
        return () => {
            window.removeEventListener('click', handleCloseModal);
        };
    }, []);

    function handleCloseModal(e) {
        if (userInfowrap.current && !userInfowrap.current.contains(e.target)) {
            handleInfoMenu();
        }
    }
    return (
        <>
            <ul ref={userInfowrap} className={style.userInfowrap}>
                <li className={style.myInfoWrap}>
                    <img src={userInfoStore.userInfo.imageUrl} />
                    <div className={style.myInfo}>
                        <p>{userInfoStore.userInfo.name}</p>
                        <p className={style.management}>Google 계정 관리</p>
                    </div>
                </li>
                <li className={style.logout} onClick={logout}>
                    <img src="/images/sign-out.svg" />
                    <p>로그아웃</p>
                </li>
            </ul>
        </>
    );
}

export default UserInfoMenu;
