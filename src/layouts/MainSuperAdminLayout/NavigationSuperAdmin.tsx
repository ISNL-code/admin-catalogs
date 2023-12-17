import { Box } from '@mui/material';
import NavigationButton from 'components/atoms/Buttons/NavigationButton';
import GridViewIcon from '@mui/icons-material/GridView';
import InventoryIcon from '@mui/icons-material/Inventory';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { UserProfileInterface } from 'types';
import { useLocation, useParams } from 'react-router-dom';

interface NavHeaderInterface {
    instrumentalBarHeight: number;
    headerHeight: number;
    appXPadding: number;
    string: any;
    userProfile: UserProfileInterface;
}

const NavigationHeader = ({ instrumentalBarHeight, headerHeight, appXPadding, string }: NavHeaderInterface) => {
    const { storeCode } = useParams();
    const location = useLocation();

    return (
        <Box
            px={appXPadding}
            sx={{
                display: 'flex',
                alignItems: 'center',
                height: instrumentalBarHeight,
                width: '100%',
                position: 'fixed',
                top: headerHeight,
                left: 0,
                zIndex: 200,
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #ccc',
                gap: 0.75,
            }}
        >
            <NavigationButton icon={props => <GridViewIcon {...props} />} path="/admin" title={string?.list} />
            <NavigationButton
                icon={props => <StorefrontIcon {...props} />}
                path={`/store-manager/${storeCode}/main`}
                title={string?.store}
                isShown={!location.pathname.includes('admin')}
                parent={`/store-manager/${storeCode}`}
            />
            <NavigationButton
                icon={props => <InventoryIcon {...props} />}
                path={`/store-inventory/${storeCode}/products`}
                title={string?.inventory}
                isShown={!location.pathname.includes('admin')}
                parent={`/store-inventory/${storeCode}`}
            />
            <NavigationButton
                icon={props => <MonetizationOnIcon {...props} />}
                path={`/store-market/${storeCode}/orders`}
                title={string?.market}
                isShown={!location.pathname.includes('admin')}
                parent={`/store-market/${storeCode}`}
            />
        </Box>
    );
};

export default NavigationHeader;
