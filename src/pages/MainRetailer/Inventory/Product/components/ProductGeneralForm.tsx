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
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { BrandsInterface, MainContextInterface, ManageProductInterface, RetailerContextInterface } from 'types';
import AddIcon from '@mui/icons-material/Add';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import { useProductsPriceApi } from 'api/useProductsPriceApi';
import { useEffect } from 'react';

const ProductGeneral = ({
    data,
    formik,
    brandsList,
    setProduct,
}: {
    data: ManageProductInterface | null;
    formik: any;
    brandsList: BrandsInterface[];
    setProduct: any;
}) => {
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const { sx } = useDevice();
    const { string, storeData }: MainContextInterface | RetailerContextInterface = useOutletContext();
    const { data: getData } = useProductsPriceApi().useGetPrice();

    useEffect(() => {
        console.log('first');
        if (!getData) return;
        console.log(getData);
    }, [getData]);
    return (
        <>
            <Box
                mt={1}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Grid mt={1} container xs={12} p={1} sx={{ border: '1px solid #ccc' }}>
                    <Grid xs={sx ? 12 : 4} p={1} sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
                        <FormControl
                            fullWidth
                            size="small"
                            error={formik.errors.manufacturer && formik.touched.manufacturer}
                        >
                            <InputLabel shrink error={formik.errors.manufacturer && formik.touched.manufacturer}>
                                {string?.brand}
                            </InputLabel>
                            <Select
                                value={data?.manufacturer || ''}
                                onChange={e => {
                                    setProduct({ ...data, manufacturer: e.target.value });
                                }}
                                label={string?.brand}
                                input={
                                    <OutlinedInput
                                        notched
                                        label={string?.brand}
                                        error={formik.errors.manufacturer && formik.touched.manufacturer}
                                    />
                                }
                            >
                                {!brandsList?.length && <MenuItem>{string?.create_a_brand}</MenuItem>}
                                {(brandsList as any[])?.map(el => {
                                    return (
                                        <MenuItem key={el.id} value={el.code}>
                                            {el.code}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>{formik.errors.manufacturer}</FormHelperText>
                        </FormControl>
                        <Button
                            variant="contained"
                            sx={{ borderRadius: '50%', minWidth: 38, height: 38, p: 0 }}
                            onClick={() => navigate(`/store-inventory/${storeCode}/brands/create`)}
                        >
                            <AddIcon />
                        </Button>
                    </Grid>

                    <Grid xs={sx ? 6 : 4} p={1}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            type="number"
                            value={data?.price.replaceAll(',', '')}
                            error={formik.errors.price && formik.touched.price}
                            helperText={formik.errors.price}
                            onChange={e => {
                                setProduct({ ...data, price: e.target.value });
                            }}
                            size="small"
                            label={string?.price}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {getCurrencySymbol(storeData?.currency)}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid xs={sx ? 6 : 4} p={1}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            type="number"
                            value={data?.sortOrder}
                            error={formik.errors.sortOrder && formik.touched.sortOrder}
                            helperText={formik.errors.sortOrder}
                            onChange={e => {
                                setProduct({ ...data, sortOrder: e.target.value });
                            }}
                            size="small"
                            label={string?.order_priority}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                {data?.descriptions &&
                    data?.descriptions?.map(({ language, name, description }, idx) => (
                        <Grid
                            container
                            xs={12}
                            key={idx}
                            sx={{
                                gap: 2,
                                background:
                                    idx % 2 !== 0
                                        ? `repeating-linear-gradient(
                                       45deg,
                                        #f3f3f378,
                                        #f3f3f378 5px,
                                        #fff 5px,
                                        #fff 10px
                                      )`
                                        : `repeating-linear-gradient(
                                135deg,
                                #f3f3f378,
                                #f3f3f378 5px,
                                #fff 5px,
                                #fff 10px
                              )`,
                                p: 2,
                                border: '1px solid',

                                borderColor:
                                    formik?.errors.descriptions &&
                                    formik.touched.descriptions &&
                                    formik.errors.descriptions[idx]?.name &&
                                    formik.touched.descriptions[idx]?.name
                                        ? '#d32f2f'
                                        : '#ccc',
                            }}
                        >
                            <Grid xs={12} mb={-1}>
                                <Typography variant="h3">{language?.toUpperCase()}</Typography>
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    value={name}
                                    onChange={e => {
                                        setProduct({
                                            ...data,
                                            descriptions: data.descriptions?.map(el => {
                                                if (el.language === language) {
                                                    return {
                                                        ...el,
                                                        name: e.target.value,
                                                        friendlyUrl: e.target.value,
                                                        keyWords: e.target.value,
                                                        highlights: e.target.value,
                                                        metaDescription: e.target.value,
                                                        title: e.target.value,
                                                    };
                                                }
                                                return { ...el };
                                            }),
                                        });
                                    }}
                                    size="small"
                                    label={string?.name}
                                    fullWidth
                                    error={
                                        formik?.errors.descriptions && formik.touched.descriptions
                                            ? formik.errors.descriptions[idx]?.name &&
                                              formik.touched.descriptions[idx]?.name
                                            : false
                                    }
                                    helperText={
                                        formik?.errors.descriptions ? formik.errors.descriptions[idx]?.name : ''
                                    }
                                />
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    value={description}
                                    onChange={e => {
                                        setProduct({
                                            ...data,
                                            descriptions: data.descriptions?.map(el => {
                                                if (el.language === language) {
                                                    return {
                                                        ...el,
                                                        description: e.target.value,
                                                    };
                                                }
                                                return { ...el };
                                            }),
                                        });
                                    }}
                                    size="small"
                                    label={string?.description}
                                    fullWidth
                                    multiline
                                    minRows={1}
                                    error={
                                        formik?.errors.descriptions && formik.touched.descriptions
                                            ? formik.errors.descriptions[idx]?.description &&
                                              formik.touched.descriptions[idx]?.description
                                            : false
                                    }
                                    helperText={
                                        formik?.errors.descriptions ? formik.errors.descriptions[idx]?.description : ''
                                    }
                                />
                            </Grid>
                        </Grid>
                    ))}
            </Box>
        </>
    );
};

export default ProductGeneral;
