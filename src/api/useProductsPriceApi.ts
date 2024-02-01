import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useProductsPriceApi = () => {
    const { post } = useApi();

    const useSetProductPrice = () =>
        useMutation(({ storeCode, productSku }: any) =>
            post({
                url: `v1/private/product/${productSku}/price?store=${storeCode}`,
                body: {
                    // code: 'string',
                    // defaultPrice: true,
                    descriptions: [
                        // {
                        //     description: 'string',
                        //     friendlyUrl: 'string',
                        //     highlights: 'string',
                        //     id: 0,
                        //     keyWords: 'string',
                        //     language: 'string',
                        //     metaDescription: 'string',
                        //     name: 'string',
                        //     priceAppender: 'string',
                        //     title: 'string',
                        // },
                    ],
                    // discountEndDate: 'string',
                    // discountStartDate: 'string',
                    discounted: true,
                    discountedPrice: 200,
                    // id: 0,
                    // price: 0,
                    // productAvailabilityId: 0,
                    // sku: 'string',
                },
            })
        );

    return { useSetProductPrice };
};
