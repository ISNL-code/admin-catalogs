import { Box, Typography } from '@mui/material';

const PromoTags = ({ value, size, selected = false, action = () => {}, disabled = false, code }) => {
    const getColor = label => {
        if (selected) {
            if (code?.toLowerCase() === 'new')
                return {
                    border: '1px solid #35b60d',
                    background: `linear-gradient(135deg, #2b9c09 60%, #d5e9cf) padding-box, linear-gradient(90deg, #089908dc 70%, #bff5b8) border-box`,
                    color: 'white',
                    fontSize: 13,
                };
            if (code?.toLowerCase() === 'top')
                return {
                    border: '1px solid #b6590d',
                    background: `linear-gradient(135deg, #f08710 60%, #e9ddcf) padding-box, linear-gradient(90deg, #df7127dc 70%, #f5d3b8) border-box`,
                    color: 'white',
                    fontSize: 13,
                };
            if (code?.includes('%'))
                return {
                    border: '1px solid #d1000a',
                    background: `linear-gradient(135deg, #f73939 60%, #e9cfcf) padding-box, linear-gradient(90deg, #990808dc 70%, #f5b8b8) border-box`,
                    color: 'white',
                    fontSize: 13,
                };
            if (code?.toLowerCase() === 'winter')
                return {
                    border: '1px solid #0084d1',
                    background: `linear-gradient(135deg, #3975f7 60%, #e9cfcf) padding-box, linear-gradient(90deg, #084c99dc 70%, #b8d0f5) border-box`,
                    color: 'white',
                    fontSize: 11,
                };
            if (code?.toLowerCase() === 'autumn')
                return {
                    border: '1px solid #867901',
                    background: `linear-gradient(135deg, #e2ad1a 60%, #e9cfcf) padding-box, linear-gradient(90deg, #997e08dc 70%, #eaf5b8) border-box`,
                    color: 'white',
                    fontSize: 11,
                };
            if (code?.toLowerCase() === 'spring')
                return {
                    border: '1px solid #46b406',
                    background: `linear-gradient(135deg, #63e21a 60%, #d6e9cf) padding-box, linear-gradient(90deg, #319908dc 70%, #c4f5b8) border-box`,
                    color: 'white',
                    fontSize: 11,
                };
            return {
                border: '1px solid #b60dae',
                background: `linear-gradient(135deg, #b60dae 60%, #cfd2e9) padding-box, linear-gradient(90deg, #b60dae 70%, #b8bcf5) border-box`,
                color: 'white',
                fontSize: 12,
            };
        } else {
            return {
                border: '1px solid #626660',
                background: `linear-gradient(135deg, #d3d3d3 60%, #8b8b8b) padding-box, linear-gradient(90deg, #c2c2c2dc 70%, #a1a1a1) border-box`,
                color: 'white',
            };
        }
    };

    return (
        <Box
            px={1}
            py={1.4}
            sx={{
                height: size,
                width: value ? 'auto' : 60,
                minWidth: 60,
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: disabled ? 'default' : 'pointer',
                ...getColor(value),
            }}
            onClick={() => {
                if (disabled) return;
                action();
            }}
        >
            <Typography sx={{ color: selected ? 'inherit' : '#000', fontSize: 12 }}>
                {value ? value : '----'}
            </Typography>
        </Box>
    );
};

export default PromoTags;
