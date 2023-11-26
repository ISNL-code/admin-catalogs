import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './HeaderSuperAdmin';
import { useDevice } from 'hooks/useDevice';
import { useState } from 'react';
import ModalsSelector from 'layouts/ModalsSelector';
import NavigationHeader from './NavigationSuperAdmin';
import { UserProfileInterface } from 'types';

interface MainLayoutInterface {
    lang: { code: string; label: string };
    auth: boolean;
    setAuth: string;
    currentLanguage: { code: string; string: {} };
    userProfile: UserProfileInterface;
}

export default function MainSuperAdmin({ lang, auth, setAuth, currentLanguage, userProfile }: MainLayoutInterface) {
    const [openModalType, setOpenModalType] = useState<string | null>(null);
    const { sx, l } = useDevice();
    const [scrollPosition, setScrollPosition] = useState(0);
    const headerHeight = 35;
    const footerHeight = sx ? 70 : 0;
    const instrumentalBarHeight = 31;
    const appXPadding = l ? 2 : 4;

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
