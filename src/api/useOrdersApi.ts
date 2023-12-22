import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useOrdersApi = () => {
    const { get, post, put, patch, remove } = useApi();

    const useGetOrdersList = ({ storeCode, page, countPerPage }) => {
        return useQuery(
            ['get-private-product-orders-list'],

            () =>
                get({
                    url: `v1/private/orders?store=${storeCode}&lang=ua&count=${countPerPage}&page=${page}`,
                })
        );
    };

    const useGetOrderByID = ({ id }) => {
        return useQuery(
            ['get-private-order-by-id'],

            () =>
                get({
                    url: `v1/private/orders/${id}`,
                })
        );
    };

    // const useUpdateOrderStatus = () =>
    //     useMutation(({ id, status, comments, date }) => {
    //         return post({
    //             url: `v1/private/orders/${id}/history`,
    //             body: { status, comments, date },
    //         });
    //     });

    // const useGetCustomersOrders = () => {
    //     return useQuery(
    //         ['get-customers-orders'],

    //         () =>
    //             get({
    //                 url: `v1/auth/orders/`,
    //             })
    //     );
    // };

    // const useGetOrderHistory = ({ id }) => {
    //     return useQuery(
    //         ['get-order-history'],

    //         () =>
    //             get({
    //                 url: `v1/private/orders/${id}/history`,
    //             })
    //     );
    // };

    return {
        // useCreateOrder,
        useGetOrdersList,
        useGetOrderByID,
        // useUpdateOrderStatus,
        // useGetCustomersOrders,
        // useGetOrderHistory,
    };
};
