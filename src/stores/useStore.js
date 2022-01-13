// 모든 store를 모아서 사용
import { userInfoStore } from './userInfo';

const useStroe = () => {
    return { userInfoStore };
};

export default useStroe;
