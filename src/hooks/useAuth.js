import { useSelector } from 'react-redux';

// custom hook to check if any user is logged in or not
const useAuth = () => {
    // integration of react-redux hooks here
    const auth = useSelector(state => state.auth);

    if (auth.accessToken && auth.user) {
        return {
            isUserLoggedIn: true,
            userRole: auth.user.role,
        };
    }

    return {
        isUserLoggedIn: false,
        userRole: '',
    };
}

export default useAuth;