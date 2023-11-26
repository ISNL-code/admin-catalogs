import { Box, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import { useNavigate } from 'react-router-dom';

const MainHeaderLogo = () => {
    const navigate = useNavigate();
    const { xxs } = useDevice();
    return (
        <Box onClick={() => navigate('/')} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Box sx={{ display: 'flex', gap: 0.1 }}>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 16 : 26, fontWeight: 700, color: '#6495ED' }}
                >
                    C
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 16 : 26, fontWeight: 700, color: 'orange' }}
                >
                    O
                </Typography>
                <Typography sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 16 : 26, fontWeight: 700, color: 'red' }}>
                    C
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 16 : 26, fontWeight: 700, color: '#9f96d1' }}
                >
                    K
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 16 : 26, fontWeight: 700, color: '#8FBC8F' }}
                >
                    T
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 16 : 26, fontWeight: 700, color: '#7B68EE' }}
                >
                    A
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 16 : 26, fontWeight: 700, color: '#c79dc7' }}
                >
                    I
                </Typography>
                <Typography
                    sx={{ fontFamily: 'Young Serif', fontSize: xxs ? 16 : 26, fontWeight: 700, color: '#e9a33b' }}
                >
                    L
                </Typography>
            </Box>
        </Box>
    );
};

export default MainHeaderLogo;
