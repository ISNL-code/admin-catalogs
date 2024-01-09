import { useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useCustomersApi = () => {
    const { get } = useApi();

    const useGetCustomerList = ({ storeCode, page, countPerPage }) => {
        return useQuery(
            ['get-get-customers-list'],

            () =>
                get({
                    url: `v1/private/customers?store=${storeCode}&count=${countPerPage}&page=${page}`,
                })
        );
    };

    return { useGetCustomerList };
};
