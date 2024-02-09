import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useProductsPriceApi = () => {
    const { post, get } = useApi();

    const useGetPrice = () => {
        return useQuery(
            ['get-price'],

            () =>
                get({
                    url: `v1/private/product/inventory`,
                })
        );
    };

    return { useGetPrice };
};
