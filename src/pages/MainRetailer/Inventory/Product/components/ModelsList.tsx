import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
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
import { useFormik } from 'formik';
import modelFormValidations from 'helpers/Validations/modelFormValidations';
import { useProductsApi } from 'api/useProductsApi';
import DeleteModal from 'components/organisms/Modals/DeleteModal';

const ModelsList = ({ variant, colorsOptions, updateVariants, setVariant }) => {
    const { productId, storeCode } = useParams();
    const { sx } = useDevice();
    const { string, storeData }: MainContextInterface | RetailerContextInterface = useOutletContext();
    const [variationGroups, setVariationGroups] = useState<any>([]);
    const [initSku, setInitSku] = useState<number | any>(null);
    const [openModal, setOpenModal] = useState(false);

    const { refetch: checkUnique } = useProductsApi().useCheckUniqueModelSku({
        storeCode,
        code: variant?.sku,
        productId,
    });

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

    const formik = useFormik({
        initialValues: variant,
        validationSchema: modelFormValidations,
        onSubmit: values => {
            checkUnique()
                .then(res => {
                    if ((res as any).data.data.exists) {
                        if (initSku === values.sku) return res;
                        toast.error(string?.model_with_this_vendor_code_is_registered);
                        return;
                    }
                    setInitSku(values.sku);
                    return res;
                })
                .then(res => {
                    if (res) {
                        updateVariant({
                            productId,
                            storeCode,
                            data: {
                                id: values.id,
                                available: values.available,
                                sku: values.sku,
                                defaultSelection: values.defaultSelection,
                                sortOrder: values.sortOrder,
                                variation: values.variation,
                                inventory: { price: { price: values.inventory.price.price.replaceAll(',', '') } },
                            },
                        })
                            .then(_res => toast.success(string?.updated))
                            .then(_ => updateVariants())
                            .catch(err => {
                                console.log(err);
                                toast.error(err.message);
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                })
                .finally();
        },
    });

    useEffect(() => {
        setInitSku(variant.sku);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        formik.setValues(variant);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant]);

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            {openModal && (
                <DeleteModal
                    close={() => setOpenModal(false)}
                    string={string}
                    text={string?.do_you_want_to_delete_model}
                    action={() => {
                        deleteVariant({ productId, variantId: variant?.id, storeCode })
                            .then(_res => {
                                toast.success(string?.deleted);
                                updateVariants();
                            })
                            .catch(err => {
                                console.log(err);
                                toast.error(err.message);
                            });
                    }}
                />
            )}
            {(loadDelete || loadDeleteVar || loadUpdate || loadMediaFile) && <Loader />}
            <Grid mt={1} container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
                <Grid p={1} xs={sx ? 12 : 6} sx={{ display: 'flex', gap: 1 }}>
                    <Button type="submit" variant="contained">
                        {string?.update}
                    </Button>
                    <Button
                        onClick={() => {
                            setOpenModal(true);
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
                        name="sku"
                        InputLabelProps={{ shrink: true }}
                        onChange={e => {
                            setVariant(prev => {
                                return prev.map(el => {
                                    if (el.id === variant.id) return { ...variant, sku: e.target.value };
                                    return el;
                                });
                            });
                        }}
                        size="small"
                        label={string?.vendor_code}
                        fullWidth
                        value={variant?.sku}
                        helperText={formik.errors.sku as any}
                        error={(formik.errors.sku && formik.touched.sku) as any}
                    />
                </Grid>
                <Grid xs={sx ? 12 : 3} p={1} sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
                    <FormControl fullWidth size="small">
                        <InputLabel>{string?.color}</InputLabel>
                        <Select
                            value={variant.variation}
                            onChange={e => {
                                setVariant(prev => {
                                    return prev.map(el => {
                                        if (el.id === variant.id)
                                            return {
                                                ...variant,
                                                variation: e.target.value,
                                            };
                                        return el;
                                    });
                                });
                            }}
                            label={string?.color}
                        >
                            {colorsOptions?.map((el, idx) => (
                                <MenuItem key={idx} value={el.id}>
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
                        type="number"
                        InputLabelProps={{ shrink: true }}
                        value={variant?.inventory?.price?.price.replaceAll(',', '') || ''}
                        onChange={e => {
                            setVariant(prev => {
                                return prev.map(el => {
                                    if (el.id === variant.id)
                                        return {
                                            ...variant,
                                            inventory: {
                                                ...variant?.inventory,
                                                price: { price: e.target.value },
                                            },
                                        };
                                    return el;
                                });
                            });
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
                        error={
                            ((formik.errors?.inventory as any)?.price?.price &&
                                (formik.touched?.inventory as any)?.price?.price) as any
                        }
                        helperText={(formik.errors?.inventory as any)?.price?.price as any}
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
                        label={string?.order_priority}
                        fullWidth
                        error={(formik.errors.sortOrder && formik.touched.sortOrder) as any}
                        helperText={formik.errors.sortOrder as any}
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
        </form>
    );
};

export default ModelsList;
