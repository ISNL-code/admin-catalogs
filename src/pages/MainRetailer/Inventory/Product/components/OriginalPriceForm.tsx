import { useOutletContext, useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Checkbox, FormControlLabel, InputAdornment, TextField } from '@mui/material';
import { MainContextInterface, ModelInterface, RetailerContextInterface } from 'types';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import { useEffect, useState } from 'react';
import { useVariationsApi } from 'api/useVariationsApi';
import toast from 'react-hot-toast';

const INIT_ORIGINAL_PRICE_VALUE = {
    available: false,
    sku: '',
    code: '',
    defaultSelection: false,
    dateAvailable: '',
    sortOrder: -10,
    variation: null,
    productVariantGroup: '',
    inventory: {
        price: {
            price: '',
        },
        quantity: 100009099,
    },
    variationCode: '',
};

const OriginalPriceForm = ({
    data,
    setNewOriginalPrice,
    formik,
    updateVariants,
    discountedVariants,
}: {
    data: ModelInterface;
    setNewOriginalPrice;
    formik;
    updateVariants;
    discountedVariants: ModelInterface[];
}) => {
    const [isDiscounted, setIsDiscounted] = useState(false);
    const { productId, storeCode } = useParams();
    const { string, storeData }: MainContextInterface | RetailerContextInterface = useOutletContext();

    const { mutateAsync: deleteVariant } = useVariationsApi().useDeleteProductVariant();
    const { mutateAsync: updateVariant } = useVariationsApi().useUpdateProductVariant();

    const checkDiscounts = () => {
        const prices = discountedVariants.map(el => parseFloat(el.inventory?.price?.price));
        const originPriceFloat = parseFloat(data?.inventory?.price?.price?.replaceAll(',', ''));

        const isPriceValid = prices.every(discountPrice => originPriceFloat >= discountPrice);

        return isPriceValid;
    };

    useEffect(() => {
        if (data.sku) setIsDiscounted(true);
    }, [data]);

    return (
        <Grid mt={1} container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
            <Grid xs="auto" sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <FormControlLabel
                    sx={{ ml: 0 }}
                    control={
                        <Checkbox
                            checked={isDiscounted}
                            onChange={e => {
                                setIsDiscounted(e.target.checked);
                                if (data.sku) {
                                    deleteVariant({ productId, variantId: data?.id, storeCode })
                                        .then(_res => {
                                            updateVariants();
                                        })
                                        .then(() => setNewOriginalPrice(INIT_ORIGINAL_PRICE_VALUE))
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }
                            }}
                        />
                    }
                    label={string?.product_with_discount}
                />
            </Grid>

            <Grid p={1} xs="auto">
                <TextField
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    value={data?.inventory?.price?.price?.replaceAll(',', '') || ''}
                    onChange={e => {
                        setNewOriginalPrice({
                            ...data,
                            inventory: {
                                ...data?.inventory,
                                price: { ...data?.inventory.price, price: e.target.value },
                            },
                        });
                    }}
                    size="small"
                    label={string?.original_price}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">{getCurrencySymbol(storeData?.currency)}</InputAdornment>
                        ),
                    }}
                    error={formik.errors?.inventory?.price?.price && formik.touched?.inventory?.price?.price}
                    helperText={string?.[formik.errors?.inventory?.price?.price]}
                    disabled={!isDiscounted}
                />
            </Grid>
            {data.sku ? (
                <Grid p={1} xs={12}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (checkDiscounts()) {
                                updateVariant({
                                    productId,
                                    storeCode,
                                    data: {
                                        ...data,
                                        inventory: {
                                            price: { price: data?.inventory?.price?.price?.replaceAll(',', '') },
                                            quantity: 100000,
                                        },
                                    },
                                }).then(() => {
                                    toast.success(string?.updated);
                                    updateVariants();
                                });
                            } else {
                                updateVariants();
                                toast.error(string?.must_be_higher_than_discount_prices);
                            }
                        }}
                        disabled={!isDiscounted}
                    >
                        {string?.update}
                    </Button>
                </Grid>
            ) : (
                <Grid p={1} xs={12}>
                    <Button variant="contained" type="submit" disabled={!isDiscounted}>
                        {string?.save}
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};

export default OriginalPriceForm;
