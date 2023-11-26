import { IconButton, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationButtonInterface {
    icon: (props) => JSX.Element | JSX.Element[];
    path: string;
    title: string;
    isShown?: boolean;
    parent?: string;
}

const NavigationButton = ({ icon, path, title, isShown = true, parent }: NavigationButtonInterface) => {
    const navigate = useNavigate();
    const location = useLocation();
    const active = location.pathname.includes(path) || (parent && location.pathname.includes(parent));

    const { sx } = useDevice();

    if (!isShown) return null;

    return (
        <IconButton
            sx={{
                minWidth: sx ? '50px' : '100px',
                height: '30px',
                display: 'flex',
                flexDirection: sx ? 'column' : 'row',
                borderBottom: active ? '2px solid #1976d2' : '2px solid rgba(0, 0, 0, 0)',
                borderRadius: 0,
                paddingX: 1,
                alignItems: 'center',
                '&:hover': { backgroundColor: '#fff' },
                gap: sx ? 0 : 1,
            }}
            color={active ? `primary` : 'default'}
            onClick={() => {
                navigate(path);
            }}
            size="small"
        >
            {!sx && icon({ fontSize: sx ? 'small' : 'medium' })}

            <Typography
                sx={{
                    fontSize: sx ? 12 : 14,
                    fontWeight: 500,
                    color: active ? '#1976d2' : 'rgba(0, 0, 0, 0.54)',
                }}
            >
                {title}
            </Typography>
        </IconButton>
    );
};

export default NavigationButton;
