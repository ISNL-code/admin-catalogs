import { ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import mainTheme from 'theme/mainTheme';
import { ACCESS_TOKEN_KEY } from 'constants/constants';
import Login from 'components/organisms/Modals/Login';
import { useGetLanguage } from 'hooks/useGetLanguage';
import { useUserApi } from 'api/useUserApi';
import MainSuperAdmin from 'layouts/MainSuperAdminLayout/MainSuperAdmin';
import SuperAdminRouter from 'pages/MainSuperAdmin/SuperAdminRouter';
import StoreProfileRouter from 'pages/MainRetailer/Profile/StoreProfileRouter';
import { Toaster } from 'react-hot-toast';
import MainRetailer from 'layouts/MainRetailerLayout/MainRetailer';
import { UserProfileInterface } from 'types';
import Loader from 'components/atoms/Loader/Loader';
import StoreMarketRouter from 'pages/MainRetailer/Market/StoreMarketRouter';
import StoreInventoryRouter from 'pages/MainRetailer/Inventory/StoreInventoryRouter';
import { useDevice } from 'hooks/useDevice';

const MainRouter = ({ lang, auth, setAuth, currentLanguage, userProfile }) => {
    if (!userProfile) return <Loader />;

    const initializePermissions = permissions => {
        const haveAccess = permissions.every(el => userProfile.permissions?.map(el => el.id).includes(el));
        return haveAccess;
    };

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
                    {/* <Route path="*" element={<Navigate to="/store-manager" replace />} /> */}
                </Route>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

const App = () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const lang = { code: 'ua', label: 'Ukraine' };
    const [auth, setAuth] = useState<boolean>(!!token || false);
    const [userProfile, setUserProfile] = useState<UserProfileInterface | null>(null);
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

    if (isFetching) return <Loader />;

    return (
        <ThemeProvider theme={mainTheme}>
            <Toaster
                position="top-right"
                toastOptions={{ style: { width: '100vw', maxWidth: sx ? '100vw' : '' }, duration: 3000 }}
            />
            <Router>
                <Routes>
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
                    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
