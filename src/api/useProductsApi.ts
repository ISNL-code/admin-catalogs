import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useProductsApi = () => {
    const { get, remove, patch, put, post } = useApi();

    const useGetProductsList = ({ storeCode, page, countPerPage, lang }): any => {
        return useQuery(
            ['get-products-list'],

            () =>
                get({
                    url: `v2/products?store=${storeCode}&lang=${lang}&count=${countPerPage}&origin=admin&page=${page}`,
                }),
            { enabled: Boolean(lang) }
        );
    };

    const useSwitchProduct = () =>
        useMutation(({ id, complete, storeCode }: any) =>
            patch({
                url: `v1/private/product/${id}?store=${storeCode}`,
                body: {
                    available: complete,
                    quantity: 1000000,
                },
            })
        );

    const useCreateProduct = () =>
        useMutation(({ storeCode, data }: any) => {
            return post({
                url: `v2/private/product?store=${storeCode}`,
                body: {
                    ...data,
                    quantity: 1000000,
                },
            });
        });

    // тут не меняет общую цену нормально но обновляет дескрипшены
    const useUpdateProduct = () =>
        useMutation(({ storeCode, data }: any) =>
            put({
                url: `v2/private/product/${data.id}?store=${storeCode}`,
                body: {
                    ...data,
                    quantity: 1000000,
                },
            })
        );

    // тут меняет общую цену нормально но не обновляет дескрипшены
    // const useUpdateProduct = () =>
    //     useMutation(({ storeCode, data }: any) =>
    //         patch({
    //             url: `v1/private/product/${data.id}?store=${storeCode}`,
    //             body: {
    //                 ...data,
    //                 quantity: 1000000,
    //             },
    //         })
    //     );

    const useDeleteProduct = () =>
        useMutation(({ storeCode, id }: any) =>
            remove({
                url: `v2/private/product/${id}?store=${storeCode}`,
            })
        );

    const useGetProductById = ({ productId, storeCode, lang = '_all' }) => {
        return useQuery(
            ['get-private-product-by-id'],

            () =>
                get({
                    url: `/v2/private/product/${productId}?lang=${lang}&&store=${storeCode}`,
                }),
            { enabled: !!productId }
        );
    };

    const useGetProductBySku = ({ sku, storeCode, page, countPerPage, lang }) => {
        return useQuery(
            ['get-product-by-sku'],

            () =>
                get({
                    url: `v2/products?variantSku=${sku}&count=${countPerPage}&store=${storeCode}&page=${page}&lang=${lang}`,
                }),
            { enabled: false }
        );
    };
    const useGetVariantsByProductID = ({ id, storeCode }) => {
        return useQuery(
            ['get-all-variants-by-product-id'],

            () =>
                get({
                    url: `/v2/private/product/${id}/variants?store=${storeCode}&count=50`,
                }),
            {
                enabled: !!id,
            }
        );
    };

    const useCheckUniqueModelSku = ({ code, productId, storeCode }) =>
        useQuery(
            ['get-model-sku-unique'],

            () =>
                get({
                    url: `v2/private/product/${productId}/variant/${code}/unique?store=${storeCode}`,
                }),
            { enabled: false }
        );

    const useCreateModelByProductID = () =>
        useMutation(({ productId, data, storeCode }: any) =>
            post({
                url: `v2/private/product/${productId}/variant?store=${storeCode}`,
                body: {
                    ...data,
                },
            })
        );

    return {
        useGetProductsList,
        useDeleteProduct,
        useSwitchProduct,
        useGetProductById,
        useGetProductBySku,
        useGetVariantsByProductID,
        useCreateProduct,
        useUpdateProduct,
        useCheckUniqueModelSku,
        useCreateModelByProductID,
    };
};
