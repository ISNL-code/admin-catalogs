import { useMutation, useQuery } from '@tanstack/react-query';
import useApi from './useApi';

export const useUserApi = () => {
    const { post, get, remove, put } = useApi();

    const useLogin = () =>
        useMutation(({ username, password }: { username: string; password: string }) =>
            post({ url: 'v1/private/login', body: { username, password } })
        );

    const useGetUserData = ({ auth }) => {
        return useQuery(
            ['get-user-profile'],

            () =>
                get({
                    url: `v1/private/user/profile`,
                }),
            { enabled: !!auth, retry: false }
        );
    };

    const useGetUsersByStore = ({ storeCode }) => {
        return useQuery(
            ['get-users-by-store'],

            () =>
                get({
                    url: `v1/private/users?lang=en&store=${storeCode}&count=100&page=0`,
                })
        );
    };

    const useGetUsersById = ({ storeCode, userId, lang }) => {
        return useQuery(
            ['get-users-by-id'],

            () =>
                get({
                    url: `v1/private/users/${userId}?store=${storeCode}&lang=${lang}`,
                }),
            { enabled: !!userId, refetchOnMount: 'always' }
        );
    };

    const useCreateUser = () =>
        useMutation(({ storeCode, data }: any) =>
            post({ url: `v1/private/user/?store=${storeCode}`, body: { ...data } })
        );

    const useUpdateUser = () =>
        useMutation((data: any) => put({ url: `v1/private/user/${data.id}?store=${data.store}`, body: { ...data } }));

    const useDeleteUser = () =>
        useMutation(({ storeCode, userId }: any) => remove({ url: `v1/private/user/${userId}?store=${storeCode}` }));

    const useCheckUniqueEmailCode = () =>
        useMutation((data: any) => post({ url: `v1/private/user/unique`, body: { ...data } }));

    return {
        useLogin,
        useGetUserData,
        useCreateUser,
        useGetUsersByStore,
        useDeleteUser,
        useGetUsersById,
        useCheckUniqueEmailCode,
        useUpdateUser,
    };
};
