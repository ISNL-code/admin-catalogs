import { Store } from '@mui/icons-material';
import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useStoresApi = () => {
    const { get, post, remove, put } = useApi();

    const useGetAllStores = () => {
        return useQuery(
            ['get-all-stores'],

            () =>
                get({
                    url: `v1/private/stores?count=100&page=0`,
                })
        );
    };

    const useGetStoreByCode = ({ storeCode }) => {
        return useQuery(
            ['get-store-by-code'],

            () =>
                get({
                    url: `v1/store/${storeCode}`,
                })
        );
    };

    const useCheckUniqueStoreCode = ({ code }) => {
        return useQuery(
            ['check-store-code'],

            () =>
                get({
                    url: `v1/private/store/unique?code=${code}`,
                }),
            { enabled: false }
        );
    };

    const useCreateStore = () =>
        useMutation((data: { code: string }) => {
            return post({
                url: `v1/private/store`,
                body: { ...data },
            });
        });

    const useDeleteStore = () =>
        useMutation(({ storeCode }: { storeCode: string }) => {
            return remove({
                url: `v1/private/store/${storeCode}`,
            });
        });

    const useUpdateStoreData = () =>
        useMutation((data: { code: string }) => {
            return put({
                url: `v1/private/store/${data?.code}`,
                body: { ...data },
            });
        });

    const useUploadLogo = () =>
        useMutation(({ storeCode, img }: any) => {
            const file = new File(
                [img],
                img.name
                    .replaceAll(' ', '')
                    .replaceAll('(', '-')
                    .replaceAll(':', '-')
                    .replaceAll(')', '-')
                    .replaceAll('+', '-')
            );
            const formData = new FormData();
            formData.append('file', file);

            return post({
                url: `v1/private/store/${storeCode}/marketing/logo`,
                body: formData,
            });
        });

    return {
        useGetAllStores,
        useCheckUniqueStoreCode,
        useCreateStore,
        useDeleteStore,
        useGetStoreByCode,
        useUpdateStoreData,
        useUploadLogo,
    };
};
