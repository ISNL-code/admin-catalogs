import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import mainTheme from './theme/mainTheme';
import { ACCESS_TOKEN_KEY, GOOGLE_AUTH_KEY } from './constants/constants';
import Login from './components/organisms/Modals/Login';
import { useGetLanguage } from './hooks/useGetLanguage';
import { useUserApi } from './api/useUserApi';
import MainSuperAdmin from './layouts/MainSuperAdminLayout/MainSuperAdmin';
import SuperAdminRouter from './pages/MainSuperAdmin/SuperAdminRouter';
import StoreProfileRouter from './pages/MainRetailer/Profile/StoreProfileRouter';
import { Toaster } from 'react-hot-toast';
import MainRetailer from './layouts/MainRetailerLayout/MainRetailer';
import { UserProfileInterface } from './types';
import StoreMarketRouter from './pages/MainRetailer/Market/StoreMarketRouter';
import StoreInventoryRouter from './pages/MainRetailer/Inventory/StoreInventoryRouter';
import { useDevice } from './hooks/useDevice';
import PolicyPage from './PolicyPage';
import Loader from 'components/atoms/Loader/Loader';
import { useGoogleApi } from 'api/useGoogleApi';

const MainRouter = ({ lang, auth, setAuth, currentLanguage, userProfile }) => {
    const google_token = localStorage.getItem(GOOGLE_AUTH_KEY);
    const [googleIsAuth, setGoogleIsAuth] = useState<boolean>(Boolean(google_token) || false);
    const { mutateAsync: googleAuth, isLoading: loadGoogleAuth } = useGoogleApi().useGoogleAuth();

    const initializePermissions = permissions => {
        const haveAccess = permissions.every(el => userProfile.permissions?.map(el => el.id).includes(el));
        return haveAccess;
    };

    useEffect(() => {
        if (!googleIsAuth)
            googleAuth().then(res => {
                const google_token = res.data.access_token;
                localStorage?.setItem(GOOGLE_AUTH_KEY, google_token);
            });
        if (googleIsAuth) alert('GooGle AUTH Success');
    }, [googleIsAuth]);

    if (!userProfile || loadGoogleAuth) return <Loader />;

    return (
        <Routes>
            {initializePermissions([2]) && (
                <Route
                    element={
                        <MainSuperAdmin
                            lang={lang}
                            auth={auth}
                            setAuth={setAuth}
                            currentLanguage={currentLanguage}
                            userProfile={userProfile}
                        />
                    }
                >
                    <Route path={'/admin*'} element={<SuperAdminRouter />} />
                    <Route path={'/store-manager/:storeCode/*'} element={<StoreProfileRouter />} />
                    <Route path={'/store-inventory/:storeCode/*'} element={<StoreInventoryRouter />} />
                    <Route path={'/store-market/:storeCode/*'} element={<StoreMarketRouter />} />
                    <Route path="*" element={<Navigate to="/admin" replace />} />
                </Route>
            )}
            {initializePermissions([3]) && (
                <Route
                    element={
                        <MainRetailer
                            lang={lang}
                            auth={auth}
                            setAuth={setAuth}
                            currentLanguage={currentLanguage}
                            userProfile={userProfile}
                        />
                    }
                >
                    <Route path="/store-manager/:storeCode/*" element={<StoreProfileRouter />} />
                    <Route path={'/store-inventory/:storeCode/*'} element={<StoreInventoryRouter />} />
                    <Route path={'/store-market/:storeCode/*'} element={<StoreMarketRouter />} />
                    <Route path="*" element={<Navigate to="/store-manager" replace />} />
                </Route>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

const App = () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const [lang, setLang] = useState({ code: 'ua' });
    const [userProfile, setUserProfile] = useState<UserProfileInterface | null>(null);
    const [auth, setAuth] = useState<boolean>(!!token || false);
    const { refetch: updateUserData, isFetching } = useUserApi().useGetUserData({ auth });
    const { currentLanguage } = useGetLanguage({ lang: lang?.code });
    const { sx } = useDevice();

    useEffect(() => {
        if (token) {
            updateUserData().then(res => {
                if (res.status === 'error') {
                    setAuth(false);
                    localStorage.removeItem(ACCESS_TOKEN_KEY);
                } else {
                    setUserProfile(res?.data?.data as UserProfileInterface);
                    setAuth(true);
                }
            });
        }
        if (!auth) setUserProfile(null); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    const handleSetUserLanguage = code => {
        setLang({ code });
    };

    useEffect(() => {
        if (!userProfile) return;
        handleSetUserLanguage(userProfile?.defaultLanguage);
    }, [userProfile]);

    if (isFetching) return <Loader />;

    return (
        <ThemeProvider theme={mainTheme}>
            <Toaster
                position="top-right"
                toastOptions={{ style: { width: '100vw', maxWidth: sx ? '100vw' : '' }, duration: 3000 }}
            />
            <Router>
                <Routes>
                    <Route path={'/privacy-policy'} element={<PolicyPage />} />
                    {!auth && (
                        <Route
                            path={'/'}
                            element={<Login string={currentLanguage?.string} setAuth={setAuth} auth={auth} />}
                        />
                    )}
                    {auth && (
                        <Route
                            path={'/*'}
                            element={
                                <MainRouter
                                    lang={lang}
                                    auth={auth}
                                    setAuth={setAuth}
                                    currentLanguage={currentLanguage}
                                    userProfile={userProfile}
                                />
                            }
                        />
                    )}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
