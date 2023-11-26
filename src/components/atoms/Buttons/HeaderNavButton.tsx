import { Box, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useDevice } from 'hooks/useDevice';

interface HeaderNavButtonInterface {
    icon: (p) => ReactNode;
    path?: string;
    isShown?: boolean;
    isActive?: boolean;
    title?: string;
    action: () => void;
}

const HeaderNavButton = ({
    icon,
    path,
    isShown = true,
    isActive = true,
    title = '',
    action,
}: HeaderNavButtonInterface) => {
    const { sx } = useDevice();
    const navigate = useNavigate();
    const location = useLocation();
    const active = location.pathname === path || (location.pathname.includes('main') && isActive);

    if (isShown)
        return (
            <>
                <Box>
                    <IconButton
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            '&:hover': { backgroundColor: '#fff' },
                        }}
                        color={active ? `primary` : 'default'}
                        onClick={() => {
                            action();
                            if (!path) return;

                            navigate(path);
                        }}
                        size="small"
                    >
                        {icon({ fontSize: sx ? 'small' : 'medium' })}

                        <Typography sx={{ fontSize: 10, color: active ? '#1976d2' : 'rgba(0, 0, 0, 0.54)' }}>
                            {title}
                        </Typography>
                    </IconButton>
                </Box>
            </>
        );
    return null;
};

export default HeaderNavButton;
