import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const useTranslate = () => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const redirectToGoogleAuth = () => {
            const redirectUri = process.env.REACT_APP_GOOGLE_AUTH_REDIRECT;
            const authUrl = new URL('https://accounts.google.com/o/oauth2/auth');
            authUrl.search = new URLSearchParams({
                client_id: process.env.REACT_APP_CLIENT_ID,
                redirect_uri: redirectUri,
                scope: 'https://www.googleapis.com/auth/cloud-translation',
                response_type: 'code',
            }).toString();
            window.location.href = authUrl.toString();
        };

        const handleCallback = async searchParams => {
            const authorizationCode = searchParams.get('code');
            if (authorizationCode) {
                const accessToken = await getAccessToken(authorizationCode);
                if (accessToken) {
                    toast.success('Access token obtained successfully');
                    setAccessToken(accessToken);
                }
            } else {
                console.error('Авторизация не удалась');
                toast.error('Authorization failed');
            }
        };

        const getAccessToken = async authorizationCode => {
            const params = new URLSearchParams();
            params.append('client_id', process.env.REACT_APP_CLIENT_ID);
            params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
            params.append('grant_type', 'authorization_code');
            params.append('redirect_uri', `${window.location.origin}/callback`); // Должен совпадать с redirect_uri, использованным в авторизации
            params.append('code', authorizationCode);

            try {
                const response = await axios.post('https://oauth2.googleapis.com/token', params);
                return response.data.access_token;
            } catch (error) {
                console.error('Error getting access token', error);
                toast.error('Error obtaining access token');
                return null;
            }
        };

        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('code')) {
            handleCallback(searchParams);
        } else if (!accessToken) {
            redirectToGoogleAuth();
        }
    }, [accessToken]);

    const translateText = async (text, targetLang) => {
        if (!accessToken) {
            toast.error('No access token available');
            return null;
        }

        const url = 'https://translation.googleapis.com/language/translate/v2';
        const data = {
            q: text,
            target: targetLang,
        };
        const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

        try {
            const response = await axios.post(url, data, { headers });
            return response.data.data.translations[0].translatedText;
        } catch (error) {
            console.error('Translation Error', error);
            toast.error('Failed to translate text');
            return null;
        }
    };

    return { translateText };
};

export default useTranslate;
