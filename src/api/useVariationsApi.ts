import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useVariationsApi = () => {
    const { get, remove, post, patch, put } = useApi();

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

    const useCreateVariationGroup = () =>
        useMutation(({ variantId, storeCode }: any) => {
            return post({
                url: `/v2/private/product/productVariantGroup?store=${storeCode}`,
                body: {
                    productVariants: [variantId],
                },
            });
        });

    const useGetVariationGroupByProductID = ({ productId, storeCode }) => {
        return useQuery(
            ['get-variation-group-by-product'],

            () =>
                get({
                    url: `/v2/private/product/${productId}/productVariantGroup?store=${storeCode}&count=500`,
                })
        );
    };

    const useSetImageOrder = () =>
        useMutation(({ variationGroupId, imageId, order, storeCode }: any) =>
            patch({
                url: `/v2/private/product/productVariantGroup/${variationGroupId}/image/${imageId}?order=${order}&store=${storeCode}`,
                body: {},
            })
        );

    const useDeleteVariantMedia = () =>
        useMutation(({ variationGroupId, imageId, storeCode }: any) =>
            remove({
                url: `v2/private/product/productVariantGroup/${variationGroupId}/image/${imageId}?store=${storeCode}`,
            })
        );

    const useDeleteProductVariant = () =>
        useMutation(({ productId, variantId, storeCode }: any) =>
            remove({
                url: `v2/private/product/${productId}/variant/${variantId}?store=${storeCode}`,
            })
        );

    const useUpdateProductVariant = () =>
        useMutation(({ data, productId }: any) =>
            put({
                url: `v2/private/product/${productId}/variant/${data.id}`,
                body: {
                    ...data,
                },
            })
        );

    const useAddVariantMedia = () =>
        useMutation(({ variationGroupId, mediaFile, storeCode }: any) => {
            const file = new File(
                [mediaFile],
                mediaFile.name
                    .replaceAll(' ', '')
                    .replaceAll('(', '-')
                    .replaceAll(':', '-')
                    .replaceAll(')', '-')
                    .replaceAll('+', '-')
            );
            const formData = new FormData();
            formData.append('file', file);

            return post({
                url: `/v2/private/product/productVariantGroup/${variationGroupId}/image?store=${storeCode}`,
                body: formData,
            });
        });

    return {
        useGetListOfVariations,
        useCreateVariation,
        useDeleteVariation,
        useCreateVariationGroup,
        useSetImageOrder,
        useGetVariationGroupByProductID,
        useDeleteVariantMedia,
        useDeleteProductVariant,
        useAddVariantMedia,
        useUpdateProductVariant,
    };
};
