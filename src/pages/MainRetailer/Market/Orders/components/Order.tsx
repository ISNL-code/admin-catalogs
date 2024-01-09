import OrderDetailCard from 'components/organisms/Lists/OrderDetailCard';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import { useGetStatusParams } from 'hooks/useGetStatusParams';
import { useState } from 'react';
import StatusModal from 'components/organisms/Modals/StatusModal';
import toast from 'react-hot-toast';
import moment from 'moment';

const Order = ({ orderData, userFormData, productsData, updateOrderHistory, updateStatus, updateOrder }) => {
    const { handleGetStatusParams } = useGetStatusParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();
    const [isOpenStatusMenu, setIsOpenStatusMenu] = useState(false);
    const [isOpenConfirmStatus, setIsOpenConfirmStatus] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    const status = handleGetStatusParams(orderData?.orderStatus, string);
    return (
        <>
            {isOpenConfirmStatus && (
                <StatusModal
                    string={string}
                    close={() => setIsOpenConfirmStatus(false)}
                    action={comment => {
                        updateStatus({
                            orderId: orderData.orderId,
                            data: {
                                status: newStatus,
                                comments: comment,
                                date: moment(new Date()).format('YYYY-MM-DD'),
                            },
                        })
                            .then(() => {
                                updateOrderHistory();
                                updateOrder();
                                toast.success(string?.updated);
                            })
                            .catch(err => {
                                console.log(err);
                                toast.error(err.message);
                            });
                        console.log(comment);
                    }}
                />
            )}
            <Grid
                p={1}
                container
                xs={12}
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: sx ? 2 : 0,
                    alignItems: 'center',
                }}
                onClick={() => setIsOpenStatusMenu(false)}
            >
                <Grid xs={12} container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Grid p={1} xs={'auto'}>
                        <Typography variant="h3">
                            {string?.order} #{orderData.orderId}
                        </Typography>
                    </Grid>
                    <Grid p={1} xs={'auto'}>
                        <Box sx={{ position: 'relative' }}>
                            <Button
                                onClick={e => {
                                    e.stopPropagation();
                                    setIsOpenStatusMenu(prev => !prev);
                                }}
                                variant="contained"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: status?.color,
                                    ml: 'auto',
                                    '&:hover': { borderColor: status?.color, backgroundColor: status?.color },
                                }}
                            >
                                <Typography variant="h6" sx={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>
                                    {status?.name || '...'}
                                </Typography>
                            </Button>
                            <Box
                                onClick={e => {
                                    e.stopPropagation();
                                }}
                                p={isOpenStatusMenu ? 1 : 0}
                                px={isOpenStatusMenu ? 2 : 0}
                                sx={{
                                    position: 'absolute',
                                    top: '36px',
                                    right: 0.1,
                                    border: '1px solid #ccc',
                                    borderRadius: 2,
                                    backgroundColor: '#fff',
                                    boxShadow: '0 0 4px 1px #00000034',
                                    height: isOpenStatusMenu ? 160 : 0,
                                    opacity: isOpenStatusMenu ? 1 : 0,
                                    transition: 'height 150ms cubic-bezier(1, 0.7, 0.2, 1)',
                                    overflow: 'hidden',
                                }}
                            >
                                {isOpenStatusMenu &&
                                    ['ORDERED', 'PROCESSED', 'DELIVERED', 'REFUNDED', 'CANCELED']
                                        .filter(el => el !== orderData?.orderStatus)
                                        .map(item => {
                                            const status = handleGetStatusParams(item, string);
                                            return (
                                                <Box
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                        setIsOpenStatusMenu(prev => !prev);
                                                        setIsOpenConfirmStatus(true);
                                                        setNewStatus(item);
                                                    }}
                                                    p={0.5}
                                                    px={1}
                                                    key={item}
                                                    my={1}
                                                    sx={{
                                                        backgroundColor: status?.color,
                                                        borderRadius: 1,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        boxShadow: '0 0 4px 1px #00000034',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <Typography sx={{ color: '#fff ' }}>{status?.name}</Typography>
                                                </Box>
                                            );
                                        })}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid xs={12} container>
                    <Grid p={1} xs={'auto'} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Typography sx={{ fontSize: 16 }}>{string?.last_name}:</Typography>
                        <Typography color="initial" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            {userFormData?.billing?.firstName}
                        </Typography>
                    </Grid>
                    <Grid p={1} xs={'auto'} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Typography sx={{ fontSize: 16 }}>{string?.first_name}:</Typography>
                        <Typography color="initial" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            {userFormData?.billing?.lastName}
                        </Typography>
                    </Grid>
                    <Grid p={1} xs={'auto'} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Typography sx={{ fontSize: 16 }}>{string?.phone_number}:</Typography>
                        <Typography color="initial" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            {userFormData?.billing?.phone}
                        </Typography>
                    </Grid>
                    <Grid p={1} xs={'auto'} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Typography sx={{ fontSize: 16 }}>{string?.ordered_date}: </Typography>
                        <Typography color="initial" sx={{ fontWeight: 'bold', fontSize: 16 }}>
                            {new Date(orderData?.datePurchased).toLocaleDateString('en-GB')}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid p={1} xs={12} container>
                    <OrderDetailCard data={orderData} productsData={productsData} />
                </Grid>
            </Grid>
        </>
    );
};

export default Order;
