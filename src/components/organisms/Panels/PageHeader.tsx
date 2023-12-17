import { Box, Divider, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';

const PageHeader = ({ children, title }) => {
    const { sx, l } = useDevice();

    return (
        <Box>
            <Divider sx={{ width: '100vw', mx: l ? -2 : -4, backgroundColor: 'rgba(255, 255, 255, 0.54)' }} />
            <Box
                py={sx ? 0.25 : 1}
                px={l ? 2 : 4}
                sx={{
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: sx ? '28px' : '42px',
                    mx: l ? -2 : -4,
                    backgroundColor: '#f1f1f1',
                }}
            >
                <Box>
                    <Typography variant="h3">{title}</Typography>
                </Box>
                {children}
            </Box>
            <Divider
                sx={{
                    width: '100vw',
                    mx: l ? -2 : -4,
                    mb: sx ? 1 : 1.25,
                    backgroundColor: 'rgba(255, 255, 255, 0.54)',
                }}
            />
        </Box>
    );
};

export default PageHeader;
