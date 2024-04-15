import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';

const MainHeaderLogo = () => {
    const { xs } = useDevice();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: xs ? 0.25 : 0.25 }}>
            <Box sx={{ boxShadow: '0 0 5px 1px #414141c5', borderRadius: '50%', border: '1px solid #244c7a' }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <img
                        src={require('./5555.webp')}
                        style={{
                            width: 84,
                            height: 84,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50.4%,-50.8%)',
                        }}
                        alt="logo"
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    pt: 0.3,
                    pb: -1.5,
                    display: 'flex',
                    gap: 0.05,
                    alignItems: 'center',
                    mt: 0.5,
                    // borderBottom: '2px double #244c7a',
                    px: 0.25,
                    position: 'relative',
                    mb: 0.7,
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 28,
                        fontWeight: 600,
                        color: '#000',
                        textShadow: '#0000006a 0 0 2px',
                        mr: 0.1,
                        mt: 0.1,
                    }}
                >
                    S
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 28,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    A
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 28,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    L
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 28,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    E
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 28,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    S
                </Typography>

                <Typography
                    sx={{
                        ml: 1,
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 28,
                        fontWeight: 600,
                        color: '#000',
                        textShadow: '#0000006a 0 0 2px',
                        mr: 0.1,
                        mt: 0.1,
                    }}
                >
                    N
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 28,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    E
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 28,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    S
                </Typography>
                <Typography
                    sx={{
                        fontFamily: 'Young Serif',
                        fontSize: xs ? 24 : 28,
                        fontWeight: 500,
                        color: '#244c7a',
                        textShadow: '#000000 0 0 2px',
                    }}
                >
                    T
                </Typography>
            </Box>
        </Box>
    );
};

export default MainHeaderLogo;
