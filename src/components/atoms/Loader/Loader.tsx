import { Box, CircularProgress, Typography } from '@mui/material';

interface LoaderInterface {
    height?: string;
    zIndex?: number;
    title?: string;
    size?: string;
    defaultHeight?: string;
    position?: string;
    type?: 'both' | 'circular' | 'linear';
}

const Loader = ({
    height = '90vh',
    zIndex = 5000,
    title = '',
    defaultHeight,
    position = 'fixed',
    type = 'both',
}: LoaderInterface) => {
    return (
        <Box
            sx={{
                position: position,
                top: 0,
                left: 0,
                width: '100%',
                height: height,
                minHeight: defaultHeight ? defaultHeight : 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: zIndex,
                flexDirection: 'column',
            }}
        >
            {title && (
                <Typography sx={{ textAlign: 'center', mb: 1, maxWidth: 350, backgroundColor: 'white' }}>
                    {title}
                </Typography>
            )}
            {(type === 'both' || type === 'circular') && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}
                >
                    <CircularProgress size={90} thickness={1.5} sx={{ color: '#757575' }} />
                    <Box
                        sx={{
                            position: 'absolute',
                            overflow: 'hidden',
                            height: 85,
                            width: 85,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                            opacity: 0.6,
                        }}
                    >
                        <img src={require('assets/img/logo.jpg')} style={{ height: '56px' }} alt="img" />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default Loader;
