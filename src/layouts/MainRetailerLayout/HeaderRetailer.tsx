import { Box } from '@mui/material';
import MainHeaderLogo from 'components/atoms/Logo/MainHeaderLogo';
import LogoutIcon from '@mui/icons-material/Logout';
import HeaderNavButton from 'components/atoms/Buttons/HeaderNavButton';

interface HeaderInterface {
    headerHeight: number;
    appXPadding: number;
    string: any;
    setOpenModalType: any;
    openModalType: any;
}

const Header = ({ headerHeight, appXPadding, string, setOpenModalType, openModalType }: HeaderInterface) => {
    return (
        <Box
            px={appXPadding}
            sx={{
                height: headerHeight,
                borderBottom: '1px solid #ccc',
                position: 'fixed',
                width: '100%',
                left: 0,
                top: 0,
                zIndex: 4000,
                backgroundColor: '#fff',
                overflow: 'hidden',
            }}
        >
            <Box sx={{ height: headerHeight, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MainHeaderLogo />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HeaderNavButton
                        title={string?.logout}
                        icon={props => <LogoutIcon {...props} />}
                        isActive={['logout'].includes(openModalType)}
                        action={() => setOpenModalType('logout')}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
