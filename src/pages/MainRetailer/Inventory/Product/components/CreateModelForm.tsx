import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { MainContextInterface, ModelInterface, RetailerContextInterface } from 'types';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';

const CreateModelForm = ({
    colorsOptions,
    data,
    setNewModelData,
    formik,
}: {
    colorsOptions;
    data: ModelInterface;
    setNewModelData;
    formik;
}) => {
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const { sx } = useDevice();
    const { string, storeData }: MainContextInterface | RetailerContextInterface = useOutletContext();

    return (
        <Grid mt={1} container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
            <Grid xs={12} p={1}>
                <Typography variant="h3">{string?.create_new_model}</Typography>
            </Grid>
            <Grid p={1} xs={sx ? 12 : 3}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    name="sku"
                    value={data?.sku || ''}
                    onChange={e => {
                        setNewModelData({ ...data, sku: e.target.value });
                    }}
                    size="small"
                    label={string?.vendor_code}
                    fullWidth
                    error={formik.errors.sku && formik.touched.sku}
                    helperText={formik.errors.sku}
                />
            </Grid>
            <Grid xs={sx ? 12 : 3} p={1} sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
                <FormControl fullWidth size="small" error={formik.errors.variation && formik.touched.variation}>
                    <InputLabel shrink error={formik.errors.variation && formik.touched.variation}>
                        {string?.color}
                    </InputLabel>
                    <Select
                        value={data?.variation || ''}
                        onChange={e => {
                            setNewModelData({ ...data, variation: e.target.value });
                        }}
                        label={string?.color}
                        input={
                            <OutlinedInput
                                notched
                                label={string?.color}
                                error={formik.errors.variation && formik.touched.variation}
                            />
                        }
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
                    <FormHelperText>{formik.errors.variation}</FormHelperText>
                </FormControl>
                <Button
                    variant="contained"
                    sx={{ borderRadius: '50%', minWidth: 38, height: 38, p: 0 }}
                    onClick={() => {
                        navigate(`/store-inventory/${storeCode}/options/colors/create`);
                    }}
                >
                    <AddIcon />
                </Button>
            </Grid>
            <Grid p={1} xs={sx ? 6 : 3}>
                <TextField
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    value={data?.inventory?.price?.price || ''}
                    onChange={e => {
                        setNewModelData({
                            ...data,
                            inventory: {
                                ...data?.inventory,
                                price: { ...data?.inventory.price, price: e.target.value },
                            },
                        });
                    }}
                    size="small"
                    label={string?.price}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">{getCurrencySymbol(storeData?.currency)}</InputAdornment>
                        ),
                    }}
                    error={formik.errors?.inventory?.price?.price && formik.touched?.inventory?.price?.price}
                    helperText={formik.errors?.inventory?.price?.price}
                />
            </Grid>
            <Grid p={1} xs={sx ? 6 : 3}>
                <TextField
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    value={data?.sortOrder || ''}
                    onChange={e => {
                        setNewModelData({ ...data, sortOrder: e.target.value });
                    }}
                    size="small"
                    label={string?.order_priority}
                    fullWidth
                    error={formik.errors.sortOrder && formik.touched.sortOrder}
                    helperText={formik.errors.sortOrder}
                />
            </Grid>
            <Grid p={1} xs={12}>
                <Button variant="contained" type="submit">
                    {string?.add}
                </Button>
            </Grid>
        </Grid>
    );
};

export default CreateModelForm;
