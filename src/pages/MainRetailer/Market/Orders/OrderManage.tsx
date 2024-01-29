import { useOrdersApi } from 'api/useOrdersApi';
import Loader from 'components/atoms/Loader/Loader';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import MarketTabsPanel from 'components/organisms/Panels/MarketTabsPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Order from './components/Order';
import Delivery from './components/Delivery';
import OrderHistory from './components/OrderHistory';

const OrderManage = () => {
    const { storeCode, orderId } = useParams();
    const { string }: any = useOutletContext();
    const navigate = useNavigate();
    const [userFormData, setUserFormData] = useState<any>(null);
    const [productsData, setProductsData] = useState<any>(null);
    const [orderData, setOrderData] = useState<any>(null);
    const [orderHistory, setOrderHistory] = useState([]);

    const { mutateAsync: updateStatus } = useOrdersApi().useUpdateOrderStatus();

    const {
        data: getOrderRes,
        isFetching: loadingOrder,
        refetch: updateOrder,
    } = useOrdersApi().useGetOrderById({ orderId });

    const {
        data: getOrderHistoryRes,
        isLoading: loadHistory,
        refetch: updateOrderHistory,
    } = useOrdersApi().useGetOrderHistory({ orderId });

    useEffect(() => {
        if (!getOrderHistoryRes || loadHistory) return;
        setOrderHistory(getOrderHistoryRes.data.reverse());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getOrderHistoryRes]);

    useEffect(() => {
        if (!getOrderRes || loadingOrder) return;

        const customer = getOrderRes.data?.customer.billing;
        const delivery = getOrderRes.data?.delivery;
        const customerDelivery = getOrderRes.data?.customer.delivery;
        const email = getOrderRes.data?.customer.emailAddress;
        const orderData = getOrderRes?.data;

        setOrderData({
            datePurchased: orderData.datePurchased,
            orderId: orderData.id,
            totalPrice: orderData.total.value,
            totalQuantity: orderData.products
                .map(item => item.orderedQuantity)
                .reduce((acc, el) => acc + Number(el), 0),
            orderStatus: orderData.orderStatus,
        });
        setProductsData(orderData?.products);
        setUserFormData({
            billing: {
                firstName: customer?.firstName,
                lastName: customer?.lastName,
                phone: customer?.phone,
                company: customer?.company,
            },
            delivery: {
                firstName: delivery?.firstName || customerDelivery?.firstName,
                lastName: delivery?.lastName || customerDelivery?.lastName,
                phone: delivery?.phone || customerDelivery?.phone,
                city: delivery?.city || customerDelivery?.city,
                address: delivery?.address || customerDelivery?.address,
            },
            emailAddress: email,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getOrderRes]);

    return (
        <>
            {loadingOrder && <Loader />}
            <MarketTabsPanel
                nav={[
                    {
                        name: 'orders',
                        path: `/store-market/${storeCode}/orders`,
                        disabled: false,
                    },
                    {
                        name: 'customers',
                        path: `/store-market/${storeCode}/customers`,
                        disabled: false,
                    },
                ]}
            />
            <PageHeader title={string?.orders}>
                <ActionPanel button={[{ name: 'cancel', action: () => navigate(-1) }]} />
            </PageHeader>
            {orderData && (
                <>
                    <Box>
                        <Order
                            orderData={orderData}
                            userFormData={userFormData}
                            productsData={productsData}
                            updateOrderHistory={updateOrderHistory}
                            updateStatus={updateStatus}
                            updateOrder={updateOrder}
                        />
                    </Box>
                    <Box mt={2}>
                        <Delivery userFormData={userFormData} />
                    </Box>
                    <Box mt={2}>
                        <OrderHistory orderHistory={orderHistory} />
                    </Box>
                </>
            )}
        </>
    );
};

export default OrderManage;
