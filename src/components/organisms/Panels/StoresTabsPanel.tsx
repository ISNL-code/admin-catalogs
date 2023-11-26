import { Box } from '@mui/material';
import Tab from 'components/atoms/Buttons/Tab';
import InfoIcon from '@mui/icons-material/Info';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import { useOutletContext } from 'react-router-dom';

interface StoresTabInterface {
    nav: { name: string; path: string; disabled: boolean }[];
}

const StoresTabsPanel = ({ nav }: StoresTabInterface) => {
    const { string }: any = useOutletContext();

    const path = tab => nav.find(({ name }) => name === tab)?.path;
    const tab = tab => nav.find(({ name }) => name === tab)?.name;
    const disabled = tab => nav.find(({ name }) => name === tab)?.disabled;

    return (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
            {tab('main') === 'main' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Tab
                        title={string?.main}
                        icon={props => <InfoIcon {...props} />}
                        nav={path('main')}
                        disabled={disabled('main')}
                    />
                </Box>
            )}
            {tab('users') === 'users' && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Tab
                        title={string?.users}
                        icon={props => <GroupAddIcon {...props} />}
                        nav={path('users')}
                        disabled={disabled('users')}
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

export default StoresTabsPanel;
