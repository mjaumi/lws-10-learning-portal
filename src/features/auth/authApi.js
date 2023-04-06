import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

// initializing the auth api here
export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // POST mutation for user login
        login: builder.mutation({
            query: data => ({
                url: '/login',
                method: 'POST',
                body: data,
            }),

            // storing user credentials to store and local storage after log in completed
            async onQueryStarted(data, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    if (data.path === result.data.user.role) {
                        localStorage.setItem('learningPortalAuth', JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        }));

                        dispatch(userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user,
                        }));
                    }

                } catch (error) {

                }
            }
        }),
        //POST mutation to register new user into the server
        register: builder.mutation({
            query: data => ({
                url: '/register',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
} = authApi;
