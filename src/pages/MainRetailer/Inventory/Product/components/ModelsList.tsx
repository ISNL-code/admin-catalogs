import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';
import { useDevice } from 'hooks/useDevice';
import { useOutletContext, useParams } from 'react-router-dom';
import { MainContextInterface, RetailerContextInterface } from 'types';
import ImageCards from 'components/organisms/Lists/MediaCards/ImageCards';
import { useVariationsApi } from 'api/useVariationsApi';
import Loader from 'components/atoms/Loader/Loader';
import toast from 'react-hot-toast';

const ModelsList = ({ variant, colorsOptions, updateVariants, setVariant, formik }) => {
    const { productId, storeCode } = useParams();
    const { sx } = useDevice();
    const { string, storeData }: MainContextInterface | RetailerContextInterface = useOutletContext();
    const [variationGroups, setVariationGroups] = useState<any>([]);

    const { data: variationGroupRes } = useVariationsApi().useGetVariationGroupByProductID({
        productId,
        storeCode,
    });
    const { mutateAsync: setImageOrder } = useVariationsApi().useSetImageOrder();
    const { mutateAsync: deleteMediaFile, isLoading: loadDelete } = useVariationsApi().useDeleteVariantMedia();
    const { mutateAsync: deleteVariant, isLoading: loadDeleteVar } = useVariationsApi().useDeleteProductVariant();
    const { mutateAsync: updateVariant, isLoading: loadUpdate } = useVariationsApi().useUpdateProductVariant();
    const { mutateAsync: addMedia, isLoading: loadMediaFile } = useVariationsApi().useAddVariantMedia();

    useEffect(() => {
        if (!variationGroupRes) return;
        setVariationGroups(variationGroupRes.data.items);
    }, [variationGroupRes]);

    return (
        <Box>
            {(loadDelete || loadDeleteVar || loadUpdate || loadMediaFile) && <Loader />}
            <Grid mt={1} container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
                <Grid p={1} xs={sx ? 12 : 6} sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        onClick={() => {
                            updateVariant({
                                productId,
                                data: {
                                    id: variant.id,
                                    available: variant.available,
                                    sku: variant.sku,
                                    defaultSelection: variant.defaultSelection,
                                    sortOrder: variant.sortOrder,
                                    variation: variant.variation.id,
                                    inventory: {
                                        price: {
                                            price: variant.price.replaceAll(',', ''),
                                        },
                                        quantity: variant.inventory[0].quantity,
                                        sku: variant.sku,
                                    },
                                },
                            })
                                .then(_res => toast.success(string?.updated))
                                .then(_ => updateVariants())
                                .catch(err => {
                                    console.log(err);
                                    toast.error(err.message);
                                });
                        }}
                        variant="contained"
                    >
                        {string?.update}
                    </Button>
                    <Button
                        onClick={() => {
                            deleteVariant({ productId, variantId: variant?.id })
                                .then(_res => {
                                    toast.success(string?.deleted);
                                    updateVariants();
                                })
                                .catch(err => {
                                    console.log(err);
                                    toast.error(err.message);
                                });
                        }}
                        variant="contained"
                        color="error"
                    >
                        {string?.delete}
                    </Button>
                </Grid>
                <Grid
                    p={sx ? 1 : 0}
                    xs={sx ? 12 : 6}
                    sx={{ display: 'flex', justifyContent: sx ? 'flex-start' : 'flex-end' }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={variant?.available}
                                onChange={e => {
                                    if (e.target.checked) {
                                        setVariant(prev => {
                                            return prev.map(el => {
                                                if (el.id === variant.id) return { ...variant, available: true };
                                                return el;
                                            });
                                        });
                                    } else {
                                        setVariant(prev => {
                                            return prev.map(el => {
                                                if (el.id === variant.id) return { ...variant, available: false };
                                                return el;
                                            });
                                        });
                                    }
                                }}
                            />
                        }
                        label={string?.available}
                    />
                </Grid>
                <Grid p={1} xs={sx ? 12 : 3}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        helperText={formik.errors.sku}
                        onChange={e => {
                            setVariant(prev => {
                                return prev.map(el => {
                                    if (el.id === variant.id) return { ...variant, sku: e.target.value };
                                    return el;
                                });
                            });
                        }}
                        size="small"
                        required
                        label={string?.vendor_code}
                        fullWidth
                        value={variant?.sku}
                        error={formik.errors.sku && formik.touched.sku}
                    />
                </Grid>
                <Grid xs={sx ? 12 : 3} p={1} sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
                    <FormControl fullWidth size="small" error={formik.errors.variation && formik.touched.variation}>
                        <InputLabel error={formik.errors.variation && formik.touched.variation}>
                            {string?.color}
                        </InputLabel>
                        <Select
                            required
                            value={variant.variation.id}
                            onChange={e => {
                                setVariant(prev => {
                                    return prev.map(el => {
                                        if (el.id === variant.id)
                                            return {
                                                ...variant,
                                                variation: { ...variant.variation, id: e.target.value },
                                            };
                                        return el;
                                    });
                                });
                            }}
                            label={string?.color}
                            error={formik.errors.variation && formik.touched.variation}
                        >
                            {colorsOptions?.map((el, idx) => (
                                <MenuItem key={idx} value={el.id}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <ColorIndicatorButton color={el.optionValue.code} size={20} />
                                        <Typography sx={{ ml: 1 }}>{el.optionValue.name}</Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                            <FormHelperText>{formik.errors.variation}</FormHelperText>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid p={1} xs={sx ? 6 : 3}>
                    <TextField
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        value={variant?.price.replaceAll(',', '') || ''}
                        onChange={e => {
                            setVariant(prev => {
                                return prev.map(el => {
                                    if (el.id === variant.id) return { ...variant, price: e.target.value };
                                    return el;
                                });
                            });
                        }}
                        size="small"
                        required
                        label={string?.price}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    {getCurrencySymbol(storeData?.currency)}
                                </InputAdornment>
                            ),
                        }}
                        error={false}
                        helperText={''}
                    />
                </Grid>
                <Grid p={1} xs={sx ? 6 : 3}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        value={variant.sortOrder}
                        onChange={e => {
                            setVariant(prev => {
                                return prev.map(el => {
                                    if (el.id === variant.id) return { ...variant, sortOrder: e.target.value };
                                    return el;
                                });
                            });
                        }}
                        size="small"
                        required
                        label={string?.order_priority}
                        fullWidth
                        helperText={''}
                        error={false}
                    />
                </Grid>

                <Divider />
            </Grid>

            <ImageCards
                data={variant?.images}
                setImageOrder={setImageOrder}
                variationGroupId={
                    variationGroups?.find(el => {
                        return el?.productVariants?.find(({ id }) => id === variant?.id);
                    })?.id
                }
                deleteFile={deleteMediaFile}
                updateVariants={updateVariants}
                addMedia={addMedia}
            />
        </Box>
    );
};

export default ModelsList;
