import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useBrandsApi = () => {
    const { get, remove, post, put } = useApi();

    const useGetBrandsList = ({ storeCode, page, countPerPage }): any => {
        return useQuery(
            ['get-brands-list'],

            () =>
                get({
                    url: `v1/private/manufacturers/?lang=ua&store=${storeCode}&count=${countPerPage}&page=${page}`,
                })
        );
    };

    const useGetBrandById = ({ storeCode, brandId }): any => {
        return useQuery(
            ['get-brand-by-id'],

            () =>
                get({
                    url: `v1/manufacturer/${brandId}?lang=_all&store=${storeCode}`,
                })
        );
    };

    const useDeleteBrand = () =>
        useMutation(({ id, storeCode }: any) =>
            remove({
                url: `v1/private/manufacturer/${id}?store=${storeCode}`,
            })
        );

    const useCreateBrand = () =>
        useMutation(({ storeCode, data }: any) =>
            post({
                url: `v1/private/manufacturer?store=${storeCode}`,
                body: { ...data },
            })
        );

    const useUpdateBrand = () =>
        useMutation(({ storeCode, data }: any) =>
            put({
                url: `v1/private/manufacturer/${data.id}?store=${storeCode}`,
                body: { ...data },
            })
        );

    const useCheckBrandUnique = ({ code, storeCode }) =>
        useQuery(
            ['get-brands-unique'],

            () =>
                get({
                    url: `v1/private/manufacturer/unique?code=${code}&store=${storeCode}`,
                }),
            { enabled: false }
        );

    return { useGetBrandsList, useDeleteBrand, useGetBrandById, useCreateBrand, useUpdateBrand, useCheckBrandUnique };
};
