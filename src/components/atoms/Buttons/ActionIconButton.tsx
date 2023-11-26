import { Box, IconButton, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { useDevice } from 'hooks/useDevice';

interface ActionIconButtonInterface {
    icon: (props) => ReactNode;
    disabled?: boolean;
    title?: string;
    action: () => void;
    color: 'inherit' | 'default' | 'warning' | 'success' | 'primary' | 'secondary' | 'error' | 'info' | undefined;
    active?: boolean;
}

const ActionIconButton = ({
    icon,
    disabled = false,
    title = '',
    action,
    color,
    active = true,
}: ActionIconButtonInterface) => {
    const { sx } = useDevice();

    const getColor = () => {
        if (!active) return 'rgba(141, 141, 141, 0.54)';
        if (color === 'default') return 'rgba(0, 0, 0, 0.54)';
        if (color === 'warning') return 'orange';
        if (color === 'success') return 'green';
        if (color === 'primary' && active) return '#1976d2';
    };

    return (
        <>
            <Box>
                <IconButton
                    sx={{
                        minWidth: sx ? '35px' : '120px',
                        p: 0,
                        px: sx ? 0 : 1,
                        display: 'flex',
                        flexDirection: sx ? 'column' : 'row',
                        gap: sx ? 0 : 1,
                        border: sx ? 'none' : `1px solid ${getColor()}`,
                        borderRadius: 2,
                        alignItems: 'center',
                        backgroundColor: sx ? '' : '#fff',
                        '&:hover': { backgroundColor: '#ffffff0' },
                    }}
                    disabled={disabled}
                    color={active ? color : 'default'}
                    onClick={() => {
                        action();
                    }}
                >
                    {icon({ fontSize: 'medium' })}
                    {!sx && <Typography sx={{ fontSize: sx ? 10 : 12, color: getColor() }}>{title}</Typography>}
                </IconButton>
            </Box>
        </>
    );
};

export default ActionIconButton;
