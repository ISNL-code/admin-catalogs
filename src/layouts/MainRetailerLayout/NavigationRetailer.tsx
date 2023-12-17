import { Box } from '@mui/material';
import NavigationButton from 'components/atoms/Buttons/NavigationButton';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { UserProfileInterface } from 'types';

interface NavHeaderInterface {
    instrumentalBarHeight: number;
    headerHeight: number;
    appXPadding: number;
    string: any;
    userProfile: UserProfileInterface;
}

const NavigationHeader = ({
    instrumentalBarHeight,
    headerHeight,
    appXPadding,
    string,
    userProfile,
}: NavHeaderInterface) => {
    return (
        <Box
            px={appXPadding}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                height: instrumentalBarHeight,
                width: '100%',
                position: 'fixed',
                top: headerHeight,
                left: 0,
                zIndex: 200,
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #ccc',
            }}
        >
            <NavigationButton
                icon={props => <StorefrontIcon {...props} />}
                path={`/store-manager/${userProfile.merchant}/main`}
                title={string?.store}
                parent={`/store-manager/${userProfile.merchant}`}
            />

            <NavigationButton
                icon={props => <InventoryIcon {...props} />}
                path={`/store-inventory/${userProfile.merchant}/products`}
                title={string?.inventory}
                parent={`/store-inventory/${userProfile.merchant}`}
            />

            <NavigationButton
                icon={props => <MonetizationOnIcon {...props} />}
                path={`/store-market/${userProfile.merchant}/orders`}
                title={string?.market}
                parent={`/store-market/${userProfile.merchant}`}
            />
        </Box>
    );
};

export default NavigationHeader;
