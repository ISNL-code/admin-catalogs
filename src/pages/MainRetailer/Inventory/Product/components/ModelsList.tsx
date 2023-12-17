import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Button,
    Divider,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import Image from 'components/atoms/Media/Image';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';
import { useDevice } from 'hooks/useDevice';
import { useOutletContext } from 'react-router-dom';
import { MainContextInterface, RetailerContextInterface } from 'types';

const ModelsList = ({ variant, colorsOptions }) => {
    const { sx } = useDevice();
    const { string, storeData }: MainContextInterface | RetailerContextInterface = useOutletContext();
    const [selectedModelColor, setSelectedModelColor] = useState<any>('');
    return (
        <Grid mt={1} container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
            <Grid p={1} xs={sx ? 12 : 3}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    value={variant?.sku}
                    error={false}
                    helperText={''}
                    onChange={e => {}}
                    size="small"
                    required
                    label={string?.vendor_code}
                    fullWidth
                />
            </Grid>
            <Grid xs={sx ? 12 : 3} p={1} sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
                <FormControl fullWidth size="small">
                    <InputLabel error={false}>{string?.color}</InputLabel>
                    <Select
                        required
                        error={false}
                        value={selectedModelColor || variant.variation.id}
                        onChange={e => {
                            setSelectedModelColor(e.target.value);
                        }}
                        label={string?.brand}
                    >
                        {colorsOptions?.map(el => (
                            <MenuItem key={el.id} value={el.id}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ColorIndicatorButton color={el.optionValue.code} size={20} />
                                    <Typography sx={{ ml: 1 }}>{el.optionValue.name}</Typography>
                                </Box>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid p={1} xs={sx ? 6 : 3}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    value={variant?.inventory[0].price}
                    error={false}
                    helperText={''}
                    onChange={e => {}}
                    size="small"
                    required
                    label={string?.price}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">{getCurrencySymbol(storeData?.currency)}</InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid p={1} xs={sx ? 6 : 3}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    value={variant.sortOrder}
                    error={false}
                    helperText={''}
                    onChange={e => {}}
                    size="small"
                    required
                    label={string?.order_priority}
                    fullWidth
                />
            </Grid>
            <Grid p={1} xs={12}>
                <Button variant="contained">{string?.update}</Button>
            </Grid>
            <Divider />
            <Grid container xs={12}>
                {variant.images.map(el => {
                    if (el.imageName.includes('.mp4')) return;
                    return (
                        <Grid xs={2} key={el.id}>
                            <Image width={6} height={9} imgUrl={el.imageUrl} />
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
};

export default ModelsList;
