import { Box, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useDevice } from 'hooks/useDevice';

interface TabInterface {
    icon: (props) => ReactNode;
    title?: string;
    nav?: string;
    disabled?: boolean;
}

const Tab = ({ icon, title = '', nav = '', disabled = false }: TabInterface) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sx } = useDevice();

    const active = location.pathname.includes(nav) && !disabled;

    return (
        <>
            <Box my={sx ? 0.25 : 1}>
                <IconButton
                    sx={{
                        minWidth: sx ? '50px' : '120px',
                        p: 0,
                        px: sx ? 0 : 1,
                        display: 'flex',
                        flexDirection: sx ? 'column' : 'row',
                        gap: sx ? 0 : 1,
                        border: sx ? 'none' : `1px solid`,
                        borderColor: active
                            ? `#1976d2`
                            : disabled
                            ? 'rgba(145, 145, 145, 0.54)'
                            : 'rgba(0, 0, 0, 0.54)',
                        borderRadius: 2,
                        alignItems: 'center',
                        '&:hover': { backgroundColor: '#fff' },
                    }}
                    color={active ? 'primary' : 'default'}
                    onClick={() => {
                        navigate(nav);
                    }}
                    disabled={disabled}
                >
                    {icon({ fontSize: 'medium' })}
                    <Typography
                        sx={{
                            fontSize: sx ? 10 : 14,
                            color: active ? `#1976d2` : disabled ? 'rgba(145, 145, 145, 0.54)' : 'rgba(0, 0, 0, 0.54)',
                        }}
                    >
                        {title}
                    </Typography>
                </IconButton>
            </Box>
        </>
    );
};

export default Tab;
