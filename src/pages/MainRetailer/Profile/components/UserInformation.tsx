import { Box } from '@mui/material';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
    UseMutateAsyncFunction,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import EmptyPage from 'components/atoms/EmptyPage/EmptyPage';
import Loader from 'components/atoms/Loader/Loader';
import UsersCards from 'components/organisms/Lists/UsersCards';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { UserListInterface } from 'types';

interface UsersListPageInterface {
    data: UserListInterface[] | null;
    deleteUser: UseMutateAsyncFunction<AxiosResponse<any, any>, unknown, any, unknown>;
    isFetching: boolean;
    updateUsersListData: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
    handleSetTitle;
    handleSetActionButtons;
}

const UserInformation = ({
    data,
    deleteUser,
    isFetching,
    updateUsersListData,
    handleSetTitle,
    handleSetActionButtons,
}: UsersListPageInterface) => {
    const { storeCode } = useParams();
    const navigate = useNavigate();
    const { string }: any = useOutletContext();

    useEffect(() => {
        handleSetTitle(string?.users);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleSetActionButtons([
            {
                name: 'create',
                disabled: true,
                action: () => {
                    navigate(`/`);
                },
            },
        ]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeCode]);

    return (
        <>
            {isFetching && <Loader />}
            {!data?.length && !isFetching && <EmptyPage />}
            <Box>
                {data && (
                    <UsersCards data={data} updateUsersListData={() => updateUsersListData()} deleteUser={deleteUser} />
                )}
            </Box>
        </>
    );
};

export default UserInformation;
