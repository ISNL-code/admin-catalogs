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

    const useGetOrderById = ({ orderId }) => {
        return useQuery(
            ['get-private-order-by-id'],

            () =>
                get({
                    url: `v1/private/orders/${orderId}`,
                })
        );
    };

    const useUpdateOrderStatus = () =>
        useMutation(({ orderId, data }: any) => {
            return post({
                url: `v1/private/orders/${orderId}/history`,
                body: { ...data },
            });
        });

    const useGetOrderHistory = ({ orderId }) => {
        return useQuery(
            ['get-order-history'],

            () =>
                get({
                    url: `v1/private/orders/${orderId}/history`,
                })
        );
    };

    return {
        useGetOrdersList,
        useGetOrderById,
        useUpdateOrderStatus,
        useGetOrderHistory,
    };
};
