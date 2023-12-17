import { Box } from '@mui/material';
import ModeTab from 'components/atoms/Buttons/ModeTab';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import StraightenIcon from '@mui/icons-material/Straighten';
import SellIcon from '@mui/icons-material/Sell';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';

interface InventoryOptionsTabInterface {
    nav: { name: string; path: string; disabled?: boolean; error?: boolean }[];
}

const InventoryOptionsManagePanel = ({ nav }: InventoryOptionsTabInterface) => {
    const { string }: any = useOutletContext();
    const { sx } = useDevice();

    const path = tab => nav.find(({ name }) => name === tab)?.path;
    const tab = tab => nav.find(({ name }) => name === tab)?.name;
    const disabled = tab => nav.find(({ name }) => name === tab)?.disabled;
    const error = tab => nav.find(({ name }) => name === tab)?.error;

    return (
        <Box mt={sx ? -1 : -1.25} sx={{ display: 'flex', gap: 0.5 }}>
            {tab('colors') === 'colors' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <ModeTab
                        title={string?.colors}
                        icon={props => <ColorLensIcon {...props} />}
                        nav={path('colors')}
                        disabled={disabled('colors')}
                        error={error('colors')}
                    />
                </Box>
            )}
            {tab('sizes') === 'sizes' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <ModeTab
                        title={string?.sizes}
                        icon={props => <StraightenIcon {...props} />}
                        nav={path('sizes')}
                        disabled={disabled('sizes')}
                        error={error('sizes')}
                    />
                </Box>
            )}
            {tab('promos') === 'promos' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <ModeTab
                        title={string?.promo}
                        icon={props => <SellIcon {...props} />}
                        nav={path('promos')}
                        disabled={disabled('promos')}
                        error={error('promos')}
                    />
                </Box>
            )}
        </Box>
    );
};

export default InventoryOptionsManagePanel;
