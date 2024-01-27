import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useOptionsApi = () => {
    const { get, remove, post, put, patch } = useApi();

    const useGetValuesList = ({ storeCode, page, countPerPage }): any => {
        return useQuery(
            ['get-values-list'],

            () =>
                get({
                    url: `v1/private/product/options/values?store=${storeCode}&page=${page}&count=${countPerPage}`,
                })
        );
    };

    const useGetOptionsList = ({ storeCode }) =>
        useQuery(
            ['get-options-list'],

            () =>
                get({
                    url: `v1/private/product/options?store=${storeCode}&count=100`,
                }),
            { enabled: !!storeCode }
        );

    const useDeleteOption = () =>
        useMutation(({ optionId, storeCode }: any) =>
            remove({
                url: `v1/private/product/option/${optionId}?store=${storeCode}`,
            })
        );

    const useUpdateOption = () =>
        useMutation(({ storeCode, data }: any) =>
            put({
                url: `v1/private/product/option/${data.id}?store=${storeCode}`,
                body: {
                    ...data,
                },
            })
        );

    const useCreateOption = () =>
        useMutation(({ storeCode, data }: any) =>
            post({
                url: `v1/private/product/option?store=${storeCode}`,
                body: {
                    ...data,
                },
            })
        );

    const useGetValueById = ({ storeCode, valueId }): any => {
        return useQuery(
            ['get-value-by-id'],

            () =>
                get({
                    url: `v1/private/product/option/value/${valueId}?lang=_all&store=${storeCode}`,
                })
        );
    };

    const useDeleteValue = () =>
        useMutation(({ id, storeCode }: any) =>
            remove({
                url: `v1/private/product/option/value/${id}?store=${storeCode}`,
            })
        );

    const useCreateValue = () =>
        useMutation(({ storeCode, data }: any) =>
            post({
                url: `v1/private/product/option/value?store=${storeCode}`,
                body: {
                    ...data,
                },
            })
        );

    const useUpdateValue = () =>
        useMutation(({ storeCode, data }: any) =>
            put({
                url: `v1/private/product/option/value/${data.id}?store=${storeCode}`,
                body: { ...data },
            })
        );

    const useGetProductOptionsById = ({ storeCode, productId }) =>
        useQuery(
            ['get-all-productID-options'],

            () =>
                get({
                    url: `v1/private/product/${productId}/attributes?store=${storeCode}&lang=ua&count=200&page=0`,
                })
        );

    const useAddProductOption = () =>
        useMutation(({ productId, data, storeCode }: any) =>
            post({
                url: `v1/private/product/${productId}/attribute?store=${storeCode}`,
                body: {
                    ...data,
                },
            })
        );

    const useDeleteProductOption = () => {
        return useMutation(({ productId, attrId, storeCode }: any) => {
            return remove({
                url: `/v1/private/product/${productId}/attribute/${attrId}?store=${storeCode}`,
            });
        });
    };

    const useCheckValuesUnique = ({ code, storeCode }) => {
        return useQuery(
            ['get-values-unique'],
            () =>
                get({
                    url: `v1/private/product/option/value/unique?code=${code.replaceAll('#', '')}&store=${storeCode}`,
                }),
            { enabled: false }
        );
    };

    return {
        useGetValuesList,
        useDeleteValue,
        useCreateValue,
        useGetOptionsList,
        useCheckValuesUnique,
        useGetValueById,
        useGetProductOptionsById,
        useUpdateValue,
        useAddProductOption,
        useDeleteProductOption,
        useCreateOption,
        useUpdateOption,
        useDeleteOption,
    };
};
