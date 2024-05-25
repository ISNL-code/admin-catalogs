import { useMutation } from '@tanstack/react-query';
import useApi from './useApi';
import { GOOGLE_AUTH_KEY } from 'constants/constants';
import axios from 'axios';

export const useGoogleApi = () => {
    const { post } = useApi();

    const googleApi = axios.create({
        baseURL: 'https://translation.googleapis.com',
        headers: {
            Authorization: `Bearer ${localStorage.getItem(GOOGLE_AUTH_KEY)}`,
        },
    });

    // TO DO refresh token потому что он очень часто заканичвается

    // googleApi.interceptors.response.use(response => response, async error => {
    //     const originalRequest = error.config;
    //     if (error.response.status === 401 && !originalRequest._retry) {
    //         originalRequest._retry = true;
    //         const newToken = await refreshGoogleToken();  // Implement this function based on your app's logic
    //         localStorage.setItem(GOOGLE_AUTH_KEY, newToken);
    //         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
    //         return googleApi(originalRequest);
    //     }
    //     return Promise.reject(error);
    // });

    const useGoogleAuth = () => {
        return useMutation((authorizationCode: string) =>
            post({
                url: 'https://oauth2.googleapis.com/token',
                body: {
                    client_id: process.env.REACT_APP_CLIENT_ID,
                    client_secret: process.env.REACT_APP_CLIENT_SECRET,
                    redirect_uri: process.env.REACT_APP_GOOGLE_AUTH_REDIRECT,
                    grant_type: 'authorization_code',
                    code: authorizationCode,
                },
            })
        );
    };

    const useTranslateText = () => {
        return useMutation(({ text, lang }: { text; lang }) => {
            return googleApi.post('/language/translate/v2', {
                q: text,
                target: lang,
            });
        });
    };

    return {
        useGoogleAuth,
        useTranslateText,
    };
};
