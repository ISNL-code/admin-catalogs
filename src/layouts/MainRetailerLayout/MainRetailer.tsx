import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState } from 'react';
import ModalsSelector from 'layouts/ModalsSelector';
import Header from './HeaderRetailer';
import NavigationHeader from './NavigationRetailer';
import { StoreInterface, UserProfileInterface } from 'types';
import { useStoresApi } from 'api/useStoresApi';

interface MainLayoutInterface {
    lang: { code: string; label: string };
    auth: boolean;
    setAuth: string;
    currentLanguage: { code: string; string: {} };
    userProfile: UserProfileInterface;
}

export default function MainRetailer({ lang, auth, setAuth, currentLanguage, userProfile }: MainLayoutInterface) {
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const location = useLocation();

    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const [storeData, setStoreData] = useState<StoreInterface | null>(null);
    const { sx, l } = useDevice();
    const [scrollPosition, setScrollPosition] = useState(0);
    const headerHeight = 35;
    const footerHeight = sx ? 70 : 0;
    const instrumentalBarHeight = 31;
    const appXPadding = l ? 2 : 4;

    const { data: storeDataRes, isFetching } = useStoresApi().useGetStoreByCode({ storeCode: userProfile.merchant });

    useEffect(() => {
        if (!storeDataRes || isFetching) return;
        setStoreData(storeDataRes.data);
    }, [storeDataRes]);

    useEffect(() => {
        if (!storeCode || storeCode !== userProfile.merchant) navigate(`store-manager/${userProfile.merchant}/main`);
    }, [userProfile, storeCode, location]);

    return (
        <Box
            sx={{
                overflow: 'hidden',
            }}
        >
            <CssBaseline />
            <Header
                headerHeight={headerHeight}
                appXPadding={appXPadding}
                string={currentLanguage?.string}
                setOpenModalType={setOpenModalType}
                openModalType={openModalType}
            />
            <NavigationHeader
                instrumentalBarHeight={instrumentalBarHeight}
                headerHeight={headerHeight}
                appXPadding={appXPadding}
                string={currentLanguage.string as {}}
                userProfile={userProfile}
            />
            <Box px={appXPadding} pb={4} sx={{ mt: `${headerHeight + instrumentalBarHeight}px` }}>
                <Outlet
                    context={{
                        lang: lang?.code,
                        string: currentLanguage.string as {},
                        scrollPosition: scrollPosition,
                        setScrollPosition: setScrollPosition,
                        instrumentalBarHeight: instrumentalBarHeight,
                        headerHeight: headerHeight,
                        footerHeight: footerHeight,
                        appXPadding: appXPadding,
                        auth: auth,
                        setOpenModalType: setOpenModalType,
                        openModalType: openModalType,
                        userProfile: userProfile,
                        storeData,
                    }}
                />
            </Box>
            <ModalsSelector
                string={currentLanguage.string as string}
                setAuth={setAuth}
                openModalType={openModalType}
                setOpenModalType={setOpenModalType}
            />
        </Box>
    );
}
