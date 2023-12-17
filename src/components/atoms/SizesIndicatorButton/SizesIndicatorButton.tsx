import { Box, Typography } from '@mui/material';

const SizesIndicatorButton = ({ size, action = () => {}, label, disabled = false }) => {
    return (
        <Box
            px={0.5}
            sx={{
                width: 'fit-content',
                minWidth: size,
                height: size,
                border: '2px solid #ccc',
                background: `linear-gradient(135deg, #e9e9e9 50%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: disabled ? 'default' : 'pointer',
            }}
            onClick={() => {
                if (disabled) return;
                action();
            }}
        >
            <Typography>{label}</Typography>
        </Box>
    );
};

export default SizesIndicatorButton;
