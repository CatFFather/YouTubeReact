// 로그인 set
export function setLoginSnsInfo(login_sns) {
    localStorage.setItem('login_sns', login_sns);
}

// 로그인 get
export function getLoginSnsInfo() {
    return localStorage.getItem('login_sns');
}

// 토큰 set
export function setAccess_token(access_token) {
    localStorage.setItem('access_token', access_token);
}

// 토큰 get
export function getAccess_token() {
    return localStorage.getItem('access_token');
}

// 데이터 삭제
export function localStorage_remove(name) {
    localStorage.removeItem(name);
}
