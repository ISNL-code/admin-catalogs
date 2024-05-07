import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useOrdersApi = () => {
    const { get, post } = useApi();

    const useGetOrdersList = ({ storeCode, page, countPerPage }) => {
        return useQuery(
            ['get-private-product-orders-list'],

            () =>
                get({
                    url: `v1/private/orders?store=${storeCode}&lang=ua&count=${countPerPage}&page=${page}`,
                })
        );
    };

    const useGetOrderById = ({ orderId, storeCode }) => {
        return useQuery(
            ['get-private-order-by-id'],

            () =>
                get({
                    url: `v1/private/orders/${orderId}?store=${storeCode}`,
                })
        );
    };

    const useUpdateOrderStatus = () =>
        useMutation(({ orderId, data, storeCode }: any) => {
            return post({
                url: `v1/private/orders/${orderId}/history?store=${storeCode}`,
                body: { ...data },
            });
        });

    const useGetOrderHistory = ({ orderId, storeCode }) => {
        return useQuery(
            ['get-order-history'],

            () =>
                get({
                    url: `v1/private/orders/${orderId}/history?store=${storeCode}`,
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
