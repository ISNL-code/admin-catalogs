import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useVariationsApi = () => {
    const { get, remove, post, patch, put } = useApi();

    const useGetListOfVariations = ({ storeCode, lang }) => {
        return useQuery(
            ['get-list-of-variations'],

            () =>
                get({
                    url: `v2/private/product/variations?lang=${lang}&store=${storeCode}&count=500`,
                }),
            { enabled: Boolean(lang) }
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

    // Adding Image To Product Model Variant (e.g Model with ID ....00001, Color Black Model Image Add) Where variationGroupId is ID of Black color group
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

    // Ordering Image position for catalog view of Product Model Variant
    const useSetImageOrder = () =>
        useMutation(({ variationGroupId, imageId, order, storeCode }: any) =>
            patch({
                url: `/v2/private/product/productVariantGroup/${variationGroupId}/image/${imageId}?order=${order}&store=${storeCode}`,
                body: {},
            })
        );

    // Deleting Image of Product Model Variant (e.g Model with ID ....00001, Color Black Model Image Deleted) Where variationGroupId is ID of Black color group
    const useDeleteVariantMedia = () =>
        useMutation(({ variationGroupId, imageId, storeCode }: any) =>
            remove({
                url: `v2/private/product/productVariantGroup/${variationGroupId}/image/${imageId}?store=${storeCode}`,
            })
        );
    const useAddTableSizeImageMedia = () =>
        useMutation(({ productId, mediaFile, storeCode }: { productId: string; mediaFile: any; storeCode: string }) => {
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
            formData.append('defaultImage', 'true');

            return post({
                url: `v1/private/product/${productId}/image?store=${storeCode}&sizes=true`,
                body: formData,
            });
        });

    const useUpdateTableSizeImageMedia = () =>
        useMutation(
            ({
                imageId,
                storeCode,
                isDefault,
                productId,
            }: {
                imageId: string;
                storeCode: string;
                isDefault: boolean;
                productId: string;
            }) =>
                patch({
                    url: `v1/private/product/${productId}/image/${imageId}?store=${storeCode}`,
                    body: {
                        defaultImage: isDefault,
                    },
                })
        );

    const useDeleteTableSizeMedia = () =>
        useMutation(({ imageId, storeCode }: { imageId: string; storeCode: string }) =>
            remove({
                url: `v1/private/product/image/${imageId}?store=${storeCode}`,
            })
        );

    const useDeleteProductVariant = () =>
        useMutation(({ productId, variantId, storeCode }: any) =>
            remove({
                url: `v2/private/product/${productId}/variant/${variantId}?store=${storeCode}`,
            })
        );

    const useUpdateProductVariant = () =>
        useMutation(({ data, productId, storeCode }: any) =>
            put({
                url: `v2/private/product/${productId}/variant/${data.id}?store=${storeCode}`,
                body: {
                    ...data,
                },
            })
        );

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
        useDeleteTableSizeMedia,
        useAddTableSizeImageMedia,
        useUpdateTableSizeImageMedia,
    };
};
