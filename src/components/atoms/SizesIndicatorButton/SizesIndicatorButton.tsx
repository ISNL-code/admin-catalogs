import { Box, Typography } from '@mui/material';

const SizesIndicatorButton = ({ size, action = () => {}, label, disabled = false, selected = false }) => {
    return (
        <Box
            px={0.5}
            sx={{
                width: 'fit-content',
                minWidth: size,
                height: size,
                border: selected ? '1px solid #757575' : '1px solid #ccc',
                background: selected
                    ? `linear-gradient(135deg, #54a121 60%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`
                    : disabled
                    ? `linear-gradient(135deg, #e9e9e9 50%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`
                    : `linear-gradient(135deg, #a8d5ff 40%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`,
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
            <Typography sx={{ color: selected ? '#fff' : '#4b4b4b', fontWeight: 700 }}>{label}</Typography>
        </Box>
    );
};

export default SizesIndicatorButton;
