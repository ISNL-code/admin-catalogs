import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useVariationsApi = () => {
    const { get, remove, post, put } = useApi();

    const useGetListOfVariations = ({ storeCode }) => {
        return useQuery(
            ['get-list-of-variations'],

            () =>
                get({
                    url: `v2/private/product/variations?lang=ua&store=${storeCode}&count=500`,
                })
        );
    };

    const useCreateVariation = () =>
        useMutation(({ storeCode, data }: any) =>
            post({
                url: `v2/private/product/variation?store=${storeCode}`,
                body: {
                    ...data,
                },
            })
        );

    const useDeleteVariation = () =>
        useMutation(({ id, storeCode }: any) =>
            remove({
                url: `v2/private/product/variation/${id}?store=${storeCode}`,
            })
        );

    return { useGetListOfVariations, useCreateVariation, useDeleteVariation };
};
