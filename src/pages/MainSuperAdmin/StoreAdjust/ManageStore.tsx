import { Navigate, Route, Routes, useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Options from './components/Options';
import { EditDataStore, UserListInterface } from 'types';
import { useStoresApi } from 'api/useStoresApi';
import Loader from 'components/atoms/Loader/Loader';
import { useUserApi } from 'api/useUserApi';
import UsersList from './components/UsersList';
import StoreForm from './components/StoreForm';
import StoresTabsPanel from 'components/organisms/Panels/StoresTabsPanel';
import { Box, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';

const INITIAL_STORE_DATA = {
    name: '',
    code: '',
    phone: '',
    email: '',
    address: {
        searchControl: '',
        stateProvince: '',
        country: 'UA',
        address: '',
        postalCode: '',
        city: '',
    },
    supportedLanguages: [],
    defaultLanguage: '',
    currency: '',
    currencyFormatNational: false, //not in use
    weight: '', //not in use
    dimension: '', //not in use
    inBusinessSince: new Date(),
    useCache: false, //not in use
    retailer: false, //not in use
    logo: null,
    //add
    image: null,
};

const ManageStore = () => {
    const { string }: any = useOutletContext();
    const { storeCode } = useParams();
    const [storeData, setStoreData] = useState<EditDataStore>(INITIAL_STORE_DATA);
    const [usersList, setUsersList] = useState<UserListInterface[] | null>(null);
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);

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
            supportedLanguages: storeDataRes.data.supportedLanguages?.map(el => {
                return el.code;
            }),
        });
    }, [storeDataRes]);

    useEffect(() => {
        if (!usersListData) return;
        setUsersList(usersListData.data.data);
    }, [usersListData]);

    const submitStoresForm = isValid => {
        if (!isValid()) return;
        updateStoreData(storeData)
            .then(res => {
                if (res.status === 200) {
                    if (res.status === 200) toast.success(string?.updated);
                }
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message);
            });
    };

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
                        path: `/admin/store/manage/${storeCode}/main`,
                        disabled: false,
                    },
                    { name: 'users', path: `/admin/store/manage/${storeCode}/users`, disabled: false },
                    { name: 'options', path: `/admin/store/manage/${storeCode}/options`, disabled: false },
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
                        <StoreForm
                            data={storeData}
                            handleChangeStoreData={handleChangeStoreData}
                            submitForm={submitStoresForm}
                            isLoading={isLoading}
                            handleSetTitle={handleSetTitle}
                            handleSetActionButtons={handleSetActionButtons}
                        />
                    }
                />
                <Route
                    path={'/users'}
                    element={
                        <UsersList
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
                        <Options
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
