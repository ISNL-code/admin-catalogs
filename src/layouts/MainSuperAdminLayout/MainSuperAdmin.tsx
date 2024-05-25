import { Outlet, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './HeaderSuperAdmin';
import { useDevice } from 'hooks/useDevice';
import { useEffect, useState } from 'react';
import ModalsSelector from 'layouts/ModalsSelector';
import NavigationHeader from './NavigationSuperAdmin';
import { StoreInterface, UserProfileInterface } from 'types';
import { useStoresApi } from 'api/useStoresApi';
import { STORES_DATA } from 'dataBase/STORES';

interface MainLayoutInterface {
    lang: { code: string; label: string };
    auth: boolean;
    setAuth: string;
    currentLanguage: { code: string; string: {} };
    userProfile: UserProfileInterface;
    TranslatedMode;
}

export default function MainSuperAdmin({
    lang,
    auth,
    setAuth,
    currentLanguage,
    userProfile,
    TranslatedMode,
}: MainLayoutInterface) {
    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const { storeCode } = useParams();
    const { sx, l } = useDevice();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [storeData, setStoreData] = useState<StoreInterface | null>(null);
    const headerHeight = 48;
    const footerHeight = sx ? 70 : 0;
    const instrumentalBarHeight = 31;
    const appXPadding = l ? 2 : 4;

    const { data: storeDataRes, isFetching } = useStoresApi().useGetStoreByCode({ storeCode });

    useEffect(() => {
        if (!storeDataRes || isFetching) return;
        setStoreData({ ...storeDataRes.data, ...STORES_DATA.find(({ code }) => code === storeDataRes.data.code) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeDataRes]);

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
                        TranslatedMode,
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
