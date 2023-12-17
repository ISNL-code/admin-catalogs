import axios from 'axios';
import { ACCESS_TOKEN_KEY } from 'constants/constants';

const AuthInterceptor = () => {
    const AUTH_ROUTE_PATH = '/secure';
    // const SERVER_ERROR_ROUTE_PATH = '/server-error';

    axios.defaults.baseURL = 'https://alb-test.com/api';

    axios.interceptors.request.use(
        async request => {
            const token = await localStorage.getItem(ACCESS_TOKEN_KEY);
            if (token) request.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            return request;
        },
        error => Promise.reject(error)
    );

    axios.interceptors.response.use(
        response => response,
        error => {
            if (!error || !error.response || !error.response.status || !error.response.request)
                return Promise.reject(error);
            const isApiUrl = error.response.request.responseURL?.startsWith(process.env.API_URL) ?? false;
            const isUnauthorized = error.response.status === 401;

            if (isUnauthorized && isApiUrl) {
                window.localStorage.removeItem(ACCESS_TOKEN_KEY);
                if (window.location.pathname !== AUTH_ROUTE_PATH) window.location.href = AUTH_ROUTE_PATH;
            }
            // if (error.response.status === 404) window.location.href = '/';
            // if (error.response.status >= 500) window.location.href = SERVER_ERROR_ROUTE_PATH;
            return Promise.reject(error);
        }
    );
};

export default AuthInterceptor;
