import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useOptionsApi = () => {
    const { get, remove, post, put } = useApi();

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

    const useCheckValuesUnique = ({ code }) => {
        return useQuery(
            ['get-values-unique'],
            () =>
                get({
                    url: `v1/private/product/option/value/unique?code=${code}`,
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
        useUpdateValue,
    };
};
