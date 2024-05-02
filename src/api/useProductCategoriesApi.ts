import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useProductCategoriesApi = () => {
    const { get, post, put, remove } = useApi();

    const useGetAllProductsCategories = ({ storeCode, lang }) => {
        return useQuery(
            //query key
            ['get-all-product-categories'],
            //get function
            () => get({ url: `/v1/category?lang=${lang}&store=${storeCode}&count=1000&page=0` }),
            { enabled: Boolean(lang) }
        );
    };

    const useGetShopCategoryBuId = ({ categoryId, storeCode }) => {
        return useQuery(
            //query key
            ['get-shop-category-by-id'],
            //get function
            () => get({ url: `/v1/private/category/${categoryId}?lang=_all&store=${storeCode}` }),
            { enabled: false }
        );
    };

    const useAddCategoryToShop = () =>
        useMutation(({ storeCode, data }: any) =>
            post({
                url: `v1/private/category?store=${storeCode}`,
                body: {
                    ...data,
                },
            })
        );

    const useDeleteCategoryToShop = () =>
        useMutation(({ storeCode, categoryId }: any) =>
            remove({
                url: `v1/private/category/${categoryId}?store=${storeCode}`,
            })
        );

    const useAddCategoryToProduct = () =>
        useMutation(({ productId, categoryId, storeCode }: any) =>
            post({
                url: `v1/private/product/${productId}/category/${categoryId}?store=${storeCode}`,
                body: {},
            })
        );

    const useUpdateCategoryToShop = () =>
        useMutation(({ storeCode, data }: any) =>
            put({
                url: `v1/private/category/${data.id}?store=${storeCode}`,
                body: { ...data },
            })
        );

    const useDeleteCategoryToProduct = () =>
        useMutation(({ productId, categoryId, storeCode }: any) =>
            remove({
                url: `v1/private/product/${productId}/category/${categoryId}?store=${storeCode}`,
            })
        );

    const useGetSelectedCategories = ({ productId, storeCode }) => {
        return useQuery(['get-selected-product-categories'], () =>
            get({ url: `v1/category/product/${productId}?store=${storeCode}` })
        );
    };

    const useCheckCategoryUnique = ({ code, storeCode }) =>
        useQuery(
            ['get-category-unique'],

            () =>
                get({
                    url: `v1/private/category/unique?code=${code}&store=${storeCode}`,
                }),
            { enabled: false }
        );

    return {
        useGetAllProductsCategories,
        useAddCategoryToProduct,
        useDeleteCategoryToProduct,
        useGetSelectedCategories,
        useAddCategoryToShop,
        useDeleteCategoryToShop,
        useUpdateCategoryToShop,
        useCheckCategoryUnique,
        useGetShopCategoryBuId,
    };
};
