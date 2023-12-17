import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

interface ColorIndicatorInterface {
    action?;
    selected?: boolean;
    color;
    size;
    checkedSize?: 'small' | 'large' | 'medium';
    button?: boolean;
    withLabel?: boolean;
    label?: string;
}

const ColorIndicatorButton = ({
    action = () => {},
    selected,
    color,
    size,
    checkedSize = 'small',
    button = false,
    withLabel = false,
    label = '',
}: ColorIndicatorInterface) => {
    return (
        <Box
            sx={
                withLabel
                    ? {
                          display: 'flex',
                          alignItems: 'center',
                          border: selected ? '1px solid #ccc' : '0 solid #ccc',
                          borderRadius: size / 2,
                          borderLeft: 'none',
                          width: selected ? label.length * 6 + 70 : size,
                          transition: 'width 250ms cubic-bezier(1, 0.7, 0.2, 1), border 150ms ease-out',
                          overflow: 'hidden',
                          background:
                              selected && withLabel
                                  ? `linear-gradient(135deg, #e9e9e9 50%, #ffffff) padding-box 90%, linear-gradient(90deg, #a7a7a7, #dbdbdb) border-box`
                                  : 'none',
                      }
                    : null
            }
        >
            <Box
                onClick={e => {
                    if (!button) e.stopPropagation();
                    action(e);
                }}
                sx={{
                    cursor: button ? 'pointer' : 'default',
                    border: `1px solid #ccc`,
                    background: selected
                        ? `linear-gradient(135deg, ${color} 60%, #ffffff) padding-box, linear-gradient(90deg, #696969dc 70%, #c2c2c2) border-box`
                        : `linear-gradient(135deg, ${color} 50%, #ffffff) padding-box, linear-gradient(90deg, #a3a3a3, #b8b8b8) border-box`,
                    borderRadius: '50px',
                    minWidth: size,
                    height: size,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {selected && <CheckIcon fontSize={checkedSize} sx={{ color: color === '#ffffff' ? '#000' : '#fff' }} />}
            </Box>
            {withLabel && (
                <Box
                    sx={{
                        display: selected ? 'flex' : 'none',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        flexWrap: 'no-wrap',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                >
                    <Typography
                        variant="caption"
                        style={{ opacity: selected ? 1 : 0, transition: 'opacity 1250ms cubic-bezier(1, 0.7, 0.2, 1)' }}
                    >
                        {label}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ColorIndicatorButton;
