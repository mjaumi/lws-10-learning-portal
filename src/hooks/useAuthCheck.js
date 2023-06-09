import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../features/auth/authSlice';

// custom hook for checking is user authentication valid or not
const useAuthCheck = () => {
    // integration of react-redux hooks here
    const dispatch = useDispatch();

    // integration or react hooks here
    const [authChecked, setAuthChecked] = useState(false);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const localAuth = localStorage?.getItem('learningPortalAuth');

        if (localAuth) {
            const auth = JSON.parse(localAuth);

            if (auth?.accessToken && auth?.user) {
                dispatch(userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user,
                }));
                setUser(auth.user);
            }
        }
        setAuthChecked(true);
    }, [dispatch]);

    return {
        authChecked,
        userRole: user?.role,
    };
}

export default useAuthCheck;