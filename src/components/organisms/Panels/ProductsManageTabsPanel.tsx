import { Box } from '@mui/material';
import ModeTab from 'components/atoms/Buttons/ModeTab';
import SettingsIcon from '@mui/icons-material/Settings';
import AttributionIcon from '@mui/icons-material/Attribution';
import InfoIcon from '@mui/icons-material/Info';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

interface ProductsManageTabInterface {
    nav: { name: string; path: string; disabled?: boolean; error?: boolean }[];
}

const ProductsManageTabsPanel = ({ nav }: ProductsManageTabInterface) => {
    const { string }: any = useOutletContext();
    const { sx } = useDevice();

    const path = tab => nav.find(({ name }) => name === tab)?.path;
    const tab = tab => nav.find(({ name }) => name === tab)?.name;
    const disabled = tab => nav.find(({ name }) => name === tab)?.disabled;
    const error = tab => nav.find(({ name }) => name === tab)?.error;

    return (
        <Box mt={sx ? -1 : -1.25} sx={{ display: 'flex', gap: 0.5 }}>
            {tab('main') === 'main' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <ModeTab
                        title={string?.main}
                        icon={props => <InfoIcon {...props} />}
                        nav={path('main')}
                        disabled={disabled('main')}
                        error={error('main')}
                    />
                </Box>
            )}
            {tab('models') === 'models' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <ModeTab
                        title={string?.models}
                        icon={props => <AttributionIcon {...props} />}
                        nav={path('models')}
                        disabled={disabled('models')}
                        error={error('models')}
                    />
                </Box>
            )}
            {tab('options') === 'options' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <ModeTab
                        title={string?.options}
                        icon={props => <SettingsIcon {...props} />}
                        nav={path('options')}
                        disabled={disabled('options')}
                        error={error('options')}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ProductsManageTabsPanel;
