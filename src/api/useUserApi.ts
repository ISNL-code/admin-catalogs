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

    const useGetUsersById = ({ storeCode, userId }) => {
        return useQuery(
            ['get-users-by-id'],

            () =>
                get({
                    url: `v1/private/users/${userId}?store=${storeCode}`,
                }),
            { enabled: !!userId, refetchOnMount: 'always' }
        );
    };

    const useCreateUser = () =>
        useMutation((data: any) => post({ url: `v1/private/user/?store=${data.store}`, body: { ...data } }));

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
