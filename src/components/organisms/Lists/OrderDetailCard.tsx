import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Typography } from '@mui/material';

import { useOutletContext } from 'react-router-dom';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';

interface OrdersCardsInterface {
    data;
    productsData;
}

const OrderDetailCard = ({ data, productsData }: OrdersCardsInterface) => {
    const { string, storeData }: any = useOutletContext();
    const { s } = useDevice();

    if (!data) return <></>;

    return (
        <>
            {!s && (
                <Grid
                    container
                    xs={12}
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: s ? 2 : 0,
                        backgroundColor: '#f3f3f378',
                        alignItems: 'center',
                        px: s ? 0 : 2,
                    }}
                >
                    <Grid xs={2.4} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.vendor_code}
                        </Typography>
                    </Grid>
                    <Grid xs={2.4} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.size}
                        </Typography>
                    </Grid>
                    <Grid xs={2.4} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.price}
                        </Typography>
                    </Grid>
                    <Grid xs={2.4} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.quantity}
                        </Typography>
                    </Grid>
                    <Grid xs={2.4} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.final_price}
                        </Typography>
                    </Grid>
                </Grid>
            )}
            <Grid container xs={12}>
                {productsData?.map(item => {
                    const sku = item.product?.variants.find(({ id }) => id === item.variant)?.sku;
                    const size = item.attributes?.find(
                        item => item.attributeName?.toLowerCase() === 'SIZE'.toLowerCase()
                    )?.attributeValue;
                    const price = item?.price;
                    const totalQuantity = item.orderedQuantity;
                    const totalPrice = item.subTotal;

                    return (
                        <Grid
                            container
                            xs={12}
                            sx={{
                                border: '1px solid #ccc',
                                alignItems: 'center',
                                px: s ? 1 : 2,
                            }}
                        >
                            <Grid xs={s ? 12 : 2.4} sx={{ p: 1, display: 'flex', gap: s ? 0.5 : 2, flexWrap: 'wrap' }}>
                                {s && (
                                    <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                        {string?.vendor_code}:
                                    </Typography>
                                )}
                                <Typography variant="h5">{sku || 'n/a'}</Typography>
                            </Grid>
                            <Grid xs={s ? 12 : 2.4} sx={{ p: 1, display: 'flex', gap: s ? 0.5 : 2, flexWrap: 'wrap' }}>
                                {s && (
                                    <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                        {string?.size}:
                                    </Typography>
                                )}
                                <Typography variant="h5">{size || 'N/A'}</Typography>
                            </Grid>
                            <Grid xs={s ? 12 : 2.4} sx={{ p: 1, display: 'flex', gap: s ? 0.5 : 2, flexWrap: 'wrap' }}>
                                {s && (
                                    <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                        {string?.price}:
                                    </Typography>
                                )}
                                <Typography variant="h5">{price}</Typography>
                            </Grid>
                            <Grid xs={s ? 12 : 2.4} sx={{ p: 1, display: 'flex', gap: s ? 0.5 : 2, flexWrap: 'wrap' }}>
                                {s && (
                                    <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                        {string?.quantity}:
                                    </Typography>
                                )}
                                <Typography variant="h5">{totalQuantity}</Typography>
                            </Grid>
                            <Grid xs={s ? 12 : 2.4} sx={{ p: 1, display: 'flex', gap: s ? 0.5 : 2, flexWrap: 'wrap' }}>
                                {s && (
                                    <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                        {string?.final_price}:
                                    </Typography>
                                )}
                                <Typography variant="h5">{totalPrice}</Typography>
                            </Grid>
                        </Grid>
                    );
                })}
            </Grid>
            {!s && (
                <Grid
                    container
                    xs={12}
                    sx={{
                        border: '1px solid #ccc',
                        borderRadius: s ? 2 : 0,
                        backgroundColor: '#f3f3f378',
                        alignItems: 'center',
                        px: s ? 0 : 2,
                    }}
                >
                    <Grid xs={7.2} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}></Grid>
                    <Grid xs={2.4} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.total_quantity}
                        </Typography>
                    </Grid>
                    <Grid xs={2.4} sx={{ p: 1, display: 'flex', flexWrap: 'wrap' }}>
                        <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                            {string?.total_final_price}
                        </Typography>
                    </Grid>
                </Grid>
            )}
            <Grid container xs={12}>
                <Grid
                    container
                    xs={12}
                    sx={{
                        border: '1px solid #ccc',
                        alignItems: 'center',
                        px: s ? 1 : 2,
                    }}
                >
                    <></>
                    {!s && <Grid xs={7.2} sx={{ p: 1, display: 'flex', gap: s ? 0.5 : 2, flexWrap: 'wrap' }}></Grid>}

                    <Grid xs={s ? 12 : 2.4} sx={{ p: 1, display: 'flex', gap: s ? 0.5 : 2, flexWrap: 'wrap' }}>
                        {s && (
                            <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                {string?.total_quantity}:
                            </Typography>
                        )}

                        <Typography variant="h5">{data?.totalQuantity}</Typography>
                    </Grid>
                    <Grid xs={s ? 12 : 2.4} sx={{ p: 1, display: 'flex', gap: s ? 0.5 : 2, flexWrap: 'wrap' }}>
                        {s && (
                            <Typography variant="h5" sx={{ color: '#7c7c7c' }}>
                                {string?.total_final_price}:
                            </Typography>
                        )}

                        <Typography variant="h5">
                            {getCurrencySymbol(storeData?.currency) || storeData?.currency}
                            {data?.totalPrice}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default OrderDetailCard;
