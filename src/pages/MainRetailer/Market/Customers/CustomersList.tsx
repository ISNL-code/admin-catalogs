import { Box } from '@mui/material';
import { useCustomersApi } from 'api/useCustomersApi';
import LoadMoreButton from 'components/atoms/Buttons/LoadMoreButton';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import CustomersCards from 'components/organisms/Lists/CustomersCards';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import MarketTabsPanel from 'components/organisms/Panels/MarketTabsPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useIsMount } from 'hooks/useIsMount';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { CustomerInterface } from 'types';

const CustomersList = () => {
    const mount = useIsMount();
    const { storeCode } = useParams();
    const [page, setPage] = useState<number>(0);
    const [customersList, setCustomersList] = useState<CustomerInterface[] | any>(null);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { string }: any = useOutletContext();
    const countPerPage = 25;

    const {
        data: customersDataRes,
        isFetching: loadingCustomers,
        refetch: updateOrdersList,
    } = useCustomersApi().useGetCustomerList({ storeCode, page, countPerPage });

    useEffect(() => {
        if (!customersDataRes || loadingCustomers) return;
        setTotalCount(customersDataRes?.data.recordsTotal);
        setTotalPages(customersDataRes?.data.totalPages);
        if (page) return setCustomersList([...customersList, ...customersDataRes?.data.customers]);
        setCustomersList(customersDataRes?.data.customers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customersDataRes]);

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
            {loadingCustomers && <Loader />}
            {!customersList?.length && !loadingCustomers && <EmptyPage />}
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
            <PageHeader title={string?.customers}>
                <ActionPanel button={[]} />
            </PageHeader>
            <Box>
                <CustomersCards data={customersList} />
            </Box>
            <LoadMoreButton
                setCurrentPage={handleSetPage}
                totalCount={totalCount}
                loadProducts={loadingCustomers}
                productsList={customersList}
                page={page}
                totalPages={totalPages}
                countPerPage={countPerPage}
            />
        </Box>
    );
};

export default CustomersList;
