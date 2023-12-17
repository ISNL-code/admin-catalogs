import { Box } from '@mui/material';
import Tab from 'components/atoms/Buttons/Tab';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { useOutletContext } from 'react-router-dom';

interface ProductsTabInterface {
    nav: { name: string; path: string; disabled: boolean }[];
}

const ProductsTabsPanel = ({ nav }: ProductsTabInterface) => {
    const { string }: any = useOutletContext();

    const path = tab => nav.find(({ name }) => name === tab)?.path;
    const tab = tab => nav.find(({ name }) => name === tab)?.name;
    const disabled = tab => nav.find(({ name }) => name === tab)?.disabled;

    return (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
            {tab('products') === 'products' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Tab
                        title={string?.products}
                        icon={props => <ProductionQuantityLimitsIcon {...props} />}
                        nav={path('products')}
                        disabled={disabled('products')}
                    />
                </Box>
            )}

            {tab('brands') === 'brands' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Tab
                        title={string?.brands}
                        icon={props => <CheckroomIcon {...props} />}
                        nav={path('brands')}
                        disabled={disabled('brands')}
                    />
                </Box>
            )}
            {tab('categories') === 'categories' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Tab
                        title={string?.categories}
                        icon={props => <AccountTreeIcon {...props} />}
                        nav={path('categories')}
                        disabled={disabled('categories')}
                    />
                </Box>
            )}
            {tab('options') === 'options' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Tab
                        title={string?.options}
                        icon={props => <SettingsIcon {...props} />}
                        nav={path('options')}
                        disabled={disabled('options')}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ProductsTabsPanel;
