import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useProductCategoriesApi = () => {
    const { get, post, put, patch, remove } = useApi();

    const useGetAllProductsCategories = ({ storeCode }) => {
        return useQuery(
            //query key
            ['get-all-product-categories'],
            //get function
            () => get({ url: `/v1/category?lang=ua&store=${storeCode}&count=1000&page=0` })
        );
    };

    // const useAddCategoryToShop = () =>
    //     useMutation(({ code, parent, descriptions }) =>
    //         post({
    //             url: `v1/private/category`,
    //             body: {
    //                 code: code + Date.now(),
    //                 sortOrder: 0,
    //                 visible: true,
    //                 parent: {
    //                     code: parent.parentCode,
    //                     id: parent.parentID,
    //                 },
    //                 descriptions,
    //             },
    //         })
    //     );

    const useAddCategoryToProduct = () =>
        useMutation(({ productId, categoryId }: any) =>
            post({
                url: `v1/private/product/${productId}/category/${categoryId}`,
                body: {},
            })
        );

    const useDeleteCategoryToProduct = () =>
        useMutation(({ productId, categoryId }: any) =>
            remove({
                url: `v1/private/product/${productId}/category/${categoryId}`,
            })
        );

    const useGetSelectedCategories = ({ productId, storeCode }) => {
        return useQuery(['get-selected-product-categories'], () =>
            get({ url: `v1/category/product/${productId}?store=${storeCode}` })
        );
    };

    return {
        useGetAllProductsCategories,
        useAddCategoryToProduct,
        useDeleteCategoryToProduct,
        useGetSelectedCategories,
        // useAddCategoryToShop,
    };
};
