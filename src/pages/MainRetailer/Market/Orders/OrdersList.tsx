import { Box } from '@mui/material';
import LoadMoreButton from 'components/atoms/Buttons/LoadMoreButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { OrderInterface } from 'types';
import { useIsMount } from 'hooks/useIsMount';
import OrdersCards from 'components/organisms/Lists/OrdersCards';
import { useOrdersApi } from 'api/useOrdersApi';
import MarketTabsPanel from 'components/organisms/Panels/MarketTabsPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import ActionPanel from 'components/organisms/Panels/ActionPanel';

const OrdersList = () => {
    const mount = useIsMount();
    const { storeCode } = useParams();
    const [page, setPage] = useState<number>(0);
    const [ordersList, setOrdersList] = useState<OrderInterface[] | any>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { string }: any = useOutletContext();
    const countPerPage = 25;

    const {
        data: ordersDataRes,
        isFetching: loadingOrders,
        refetch: updateOrdersList,
    } = useOrdersApi().useGetOrdersList({ storeCode, page, countPerPage });

    useEffect(() => {
        if (!ordersDataRes || loadingOrders) return;
        setTotalCount(ordersDataRes?.data.recordsTotal);
        setTotalPages(ordersDataRes?.data.totalPages);
        if (page) return setOrdersList([...ordersList, ...ordersDataRes?.data.orders]);
        setOrdersList(ordersDataRes?.data.orders);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ordersDataRes]);

    useEffect(() => {
        if (mount) return;
        updateOrdersList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handleSetPage = val => {
        setPage(prev => prev + val);
    };

    return (
        <Box>
            {loadingOrders && <Loader />}
            {!ordersList?.length && !loadingOrders && <EmptyPage />}
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
                <ActionPanel button={[]} />
            </PageHeader>
            <Box>
                <OrdersCards data={ordersList} />
            </Box>
            <LoadMoreButton
                setCurrentPage={handleSetPage}
                totalCount={totalCount}
                loadProducts={loadingOrders}
                productsList={ordersList}
                page={page}
                totalPages={totalPages}
                countPerPage={countPerPage}
            />
        </Box>
    );
};

export default OrdersList;
