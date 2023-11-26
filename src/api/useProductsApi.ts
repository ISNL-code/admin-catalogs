import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useApi from './useApi';

export const useProductsApi = () => {
    const { get, remove, patch } = useApi();

    const useGetProductsList = ({ storeCode, page, countPerPage }): any => {
        return useQuery(
            ['get-products-list'],

            () =>
                get({
                    url: `v2/products?store=${storeCode}&lang=ua&count=${countPerPage}&origin=admin&page=${page}`,
                })
        );
    };

    const useSwitchProduct = () =>
        useMutation(({ id, complete }: any) =>
            patch({
                url: `v1/private/product/${id}`,
                body: {
                    available: complete,
                    quantity: 100000,
                },
            })
        );

    const useDeleteProduct = () =>
        useMutation(({ storeCode, id }: any) =>
            remove({
                url: `v2/private/product/${id}?store=${storeCode}`,
            })
        );

    const useGetProductById = ({ productId, storeCode }) => {
        return useQuery(
            ['get-private-product-by-id'],

            () =>
                get({
                    url: `/v2/private/product/${productId}?lang=_all&&store=${storeCode}`,
                }),
            { enabled: !!productId }
        );
    };

    return { useGetProductsList, useDeleteProduct, useSwitchProduct, useGetProductById };
};
