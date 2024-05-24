import { useMutation } from '@tanstack/react-query';
import useApi from './useApi';

export const useGoogleApi = () => {
    const { post } = useApi();

    const useGoogleAuth = () =>
        useMutation(() => {
            const redirectToGoogleAuth = () => {
                const redirectUri = process.env.REACT_APP_GOOGLE_AUTH_REDIRECT || '';
                const authUrl = new URL('https://accounts.google.com/o/oauth2/auth');
                authUrl.search = new URLSearchParams({
                    client_id: process.env.REACT_APP_CLIENT_ID || '',
                    redirect_uri: redirectUri,
                    scope: 'https://www.googleapis.com/auth/cloud-translation',
                    response_type: 'code',
                }).toString();
                window.location.href = authUrl.toString();
            };

            const params = new URLSearchParams();
            params.append('client_id', process.env.REACT_APP_CLIENT_ID || '');
            params.append('client_secret', process.env.REACT_APP_CLIENT_SECRET || '');
            params.append('redirect_uri', process.env.REACT_APP_GOOGLE_AUTH_REDIRECT || '');
            params.append('grant_type', 'authorization_code');
            params.append('code', authorizationCode);

            return post({ url: 'https://oauth2.googleapis.com/token', body: { ...params } });
        });

    return { useGoogleAuth };
};
