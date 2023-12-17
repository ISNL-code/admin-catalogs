import { Box, IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useDevice } from 'hooks/useDevice';

interface ModeTabInterface {
    icon: (props) => ReactNode;
    title?: string;
    nav?: string;
    disabled?: boolean;
    error?: boolean;
}

const ModeTab = ({ icon, title = '', nav = '', disabled = false, error = false }: ModeTabInterface) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { sx } = useDevice();

    const active = location.pathname.includes(nav) && !disabled;

    return (
        <>
            <Box>
                <IconButton
                    sx={{
                        minWidth: '85px',
                        p: 0,
                        px: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        border: `1px solid`,
                        borderColor: error
                            ? 'red'
                            : active
                            ? `#1976d2`
                            : disabled
                            ? 'rgba(145, 145, 145, 0.54)'
                            : 'rgba(0, 0, 0, 0.54)',
                        borderRadius: 2,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        borderTop: 'none',
                        alignItems: 'center',
                        '&:hover': { backgroundColor: '#fff' },
                    }}
                    color={error ? 'error' : active ? 'primary' : 'default'}
                    onClick={() => {
                        navigate(nav);
                    }}
                    disabled={disabled}
                >
                    {icon({ fontSize: sx ? 'small' : 'medium' })}
                    <Typography
                        sx={{
                            fontSize: sx ? 12 : 14,
                            color: error
                                ? 'red'
                                : active
                                ? `#1976d2`
                                : disabled
                                ? 'rgba(145, 145, 145, 0.54)'
                                : 'rgba(0, 0, 0, 0.54)',
                        }}
                    >
                        {title}
                    </Typography>
                </IconButton>
            </Box>
        </>
    );
};

export default ModeTab;
