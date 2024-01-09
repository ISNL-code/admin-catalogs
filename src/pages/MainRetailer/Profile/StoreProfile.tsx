import { Navigate, Route, Routes, useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EditDataStore, RetailerContextInterface, UserListInterface } from 'types';
import { useStoresApi } from 'api/useStoresApi';
import Loader from 'components/atoms/Loader/Loader';
import { useUserApi } from 'api/useUserApi';
import StoresTabsPanel from 'components/organisms/Panels/StoresTabsPanel';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import StoreInformation from './components/StoreInformation';
import UserInformation from './components/UserInformation';
import OptionsInformation from './components/OptionsInformation';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { STORES_DATA } from 'dataBase/STORES';
import { USERS_DATA } from 'dataBase/USERS';

const ManageStore = () => {
    const { userProfile, string }: RetailerContextInterface = useOutletContext();
    const { storeCode } = useParams();
    const [storeData, setStoreData] = useState<EditDataStore | any>();
    const [usersList, setUsersList] = useState<UserListInterface[] | null>(null);
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);

    const storeCodeValue = storeCode || userProfile.merchant;

    const {
        data: usersListData,
        isFetching: loadUsers,
        refetch: updateUsersListData,
    } = useUserApi().useGetUsersByStore({ storeCode: storeCode });

    const {
        data: storeDataRes,
        isFetching,
        refetch: refreshStoreData,
    } = useStoresApi().useGetStoreByCode({ storeCode });

    const { mutateAsync: updateStoreData, isLoading } = useStoresApi().useUpdateStoreData();
    const { mutateAsync: deleteUser } = useUserApi().useDeleteUser();
    const { mutateAsync: uploadLogo } = useStoresApi().useUploadLogo();

    useEffect(() => {
        if (!storeDataRes || isFetching) return;
        setStoreData({
            ...storeDataRes.data,
            ...STORES_DATA.find(({ code }) => code === storeDataRes.data.code),
            supportedLanguages: storeDataRes.data.supportedLanguages?.map(el => {
                return el.code;
            }),
        });
    }, [storeDataRes]);

    useEffect(() => {
        if (!usersListData) return;
        setUsersList(
            usersListData.data.data.map(el => {
                return { ...el, ...USERS_DATA.find(({ emailAddress }) => emailAddress === el.emailAddress) };
            })
        );
    }, [usersListData]);

    const handleChangeStoreData = newData => {
        setStoreData({ ...storeData, ...newData });
    };

    const handleSetTitle = title => {
        setTitle(title);
    };

    const handleSetActionButtons = buttons => {
        setButtons(buttons);
    };

    return (
        <>
            {(isLoading || isFetching) && <Loader />}

            <StoresTabsPanel
                nav={[
                    {
                        name: 'main',
                        path: `/store-manager/${storeCodeValue}/main`,
                        disabled: false,
                    },
                    { name: 'users', path: `/store-manager/${storeCodeValue}/users`, disabled: false },
                    { name: 'options', path: `/store-manager/${storeCodeValue}/options`, disabled: false },
                ]}
            />
            <PageHeader title={title}>
                <ActionPanel button={buttons} />
            </PageHeader>
            <Routes>
                <Route
                    index
                    path={'/main'}
                    element={
                        <StoreInformation
                            data={storeData}
                            handleChangeStoreData={handleChangeStoreData}
                            isLoading={isLoading}
                            handleSetTitle={handleSetTitle}
                            handleSetActionButtons={handleSetActionButtons}
                        />
                    }
                />
                <Route
                    path={'/users'}
                    element={
                        <UserInformation
                            deleteUser={deleteUser}
                            isFetching={loadUsers}
                            data={usersList}
                            updateUsersListData={updateUsersListData}
                            handleSetTitle={handleSetTitle}
                            handleSetActionButtons={handleSetActionButtons}
                        />
                    }
                />
                <Route
                    path={'/options'}
                    element={
                        <OptionsInformation
                            data={storeData}
                            uploadLogo={uploadLogo}
                            refreshStoreData={refreshStoreData}
                            handleSetTitle={handleSetTitle}
                            handleSetActionButtons={handleSetActionButtons}
                        />
                    }
                />

                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
        </>
    );
};

export default ManageStore;
