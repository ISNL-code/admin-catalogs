import { Box } from '@mui/material';
import Tab from 'components/atoms/Buttons/Tab';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useOutletContext } from 'react-router-dom';

interface MarketTabInterface {
    nav: { name: string; path: string; disabled: boolean }[];
}

const MarketTabsPanel = ({ nav }: MarketTabInterface) => {
    const { string }: any = useOutletContext();

    const path = tab => nav.find(({ name }) => name === tab)?.path;
    const tab = tab => nav.find(({ name }) => name === tab)?.name;
    const disabled = tab => nav.find(({ name }) => name === tab)?.disabled;

    return (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
            {tab('customers') === 'customers' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'customers' }}>
                    <Tab
                        title={string?.customers}
                        icon={props => <PeopleAltIcon {...props} />}
                        nav={path('customers')}
                        disabled={disabled('customers')}
                    />
                </Box>
            )}
            {tab('orders') === 'orders' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'orders' }}>
                    <Tab
                        title={string?.orders}
                        icon={props => <ShoppingCartIcon {...props} />}
                        nav={path('orders')}
                        disabled={disabled('orders')}
                    />
                </Box>
            )}
        </Box>
    );
};

export default MarketTabsPanel;
