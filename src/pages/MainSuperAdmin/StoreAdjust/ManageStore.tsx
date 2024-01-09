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
import toast from 'react-hot-toast';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useFormik } from 'formik';
import storeFormValidations from 'helpers/Validations/storeFormValidations';
import { STORES_DATA } from 'dataBase/STORES';
import { USERS_DATA } from 'dataBase/USERS';
import { useOptionsApi } from 'api/useOptionsApi';

const ManageStore = () => {
    const { string }: any = useOutletContext();
    const { storeCode } = useParams();
    const [storeData, setStoreData] = useState<EditDataStore | any>({});
    const [usersList, setUsersList] = useState<UserListInterface[] | null>(null);
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);
    const [options, setOptions] = useState<string[] | any>(null);

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

    const { data: OptionsRes } = useOptionsApi().useGetOptionsList({ storeCode });
    const { mutateAsync: createOption } = useOptionsApi().useCreateOption();
    const { mutateAsync: updateOption } = useOptionsApi().useUpdateOption();
    const { mutateAsync: updateStoreData, isLoading } = useStoresApi().useUpdateStoreData();
    const { mutateAsync: deleteUser } = useUserApi().useDeleteUser();
    const { mutateAsync: uploadLogo } = useStoresApi().useUploadLogo();

    const formik = useFormik({
        initialValues: storeData,
        validationSchema: storeFormValidations,
        onSubmit: values => {
            updateStoreData(values)
                .then(res => {
                    if (res.status === 200) {
                        if (res.status === 200) toast.success(string?.updated);
                    }
                })
                .then(() => {
                    if (!options.find(el => el.code === `SIZE`) && values.mainStoreSettings?.sizes) {
                        createOption({
                            storeCode,
                            data: {
                                code: `SIZE`,
                                type: 'select',
                                selectedLanguage: 'ua',
                                descriptions: storeData.supportedLanguages.map(el => {
                                    return { language: el, name: `SIZE` };
                                }),
                            },
                        });
                    } else if (options.find(el => el.code === `SIZE`) && values.mainStoreSettings?.sizes) {
                        updateOption({
                            storeCode,
                            data: {
                                id: options.find(el => el.code === `SIZE`)?.id,
                                code: `SIZE`,
                                type: 'select',
                                selectedLanguage: 'ua',
                                descriptions: storeData.supportedLanguages.map(el => {
                                    return { language: el, name: `SIZE` };
                                }),
                            },
                        });
                    }

                    if (!options.find(el => el.code === `COLOR`) && values.mainStoreSettings?.sizes) {
                        createOption({
                            storeCode,
                            data: {
                                code: `COLOR`,
                                type: 'select',
                                selectedLanguage: 'ua',
                                descriptions: storeData.supportedLanguages.map(el => {
                                    return { language: el, name: `COLOR` };
                                }),
                            },
                        });
                    } else if (options.find(el => el.code === `COLOR`) && values.mainStoreSettings?.sizes) {
                        updateOption({
                            storeCode,
                            data: {
                                id: options.find(el => el.code === `COLOR`)?.id,
                                code: `COLOR`,
                                type: 'select',
                                selectedLanguage: 'ua',
                                descriptions: storeData.supportedLanguages.map(el => {
                                    return { language: el, name: `COLOR` };
                                }),
                            },
                        });
                    }

                    if (!options.find(el => el.code === `PROMO`) && values.mainStoreSettings?.sizes) {
                        createOption({
                            storeCode,
                            data: {
                                code: `PROMO`,
                                type: 'select',
                                selectedLanguage: 'ua',
                                descriptions: storeData.supportedLanguages.map(el => {
                                    return { language: el, name: `PROMO` };
                                }),
                            },
                        });
                    } else if (options.find(el => el.code === `PROMO`) && values.mainStoreSettings?.sizes) {
                        updateOption({
                            storeCode,
                            data: {
                                id: options.find(el => el.code === `PROMO`)?.id,
                                code: `PROMO`,
                                type: 'select',
                                selectedLanguage: 'ua',
                                descriptions: storeData.supportedLanguages.map(el => {
                                    return { language: el, name: `PROMO` };
                                }),
                            },
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                });
        },
    });

    useEffect(() => {
        formik.setValues(storeData);
    }, [storeData]);

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

    useEffect(() => {
        if (!OptionsRes) return;

        setOptions(
            OptionsRes.data.options.map(({ code, id }) => {
                return { code, id };
            })
        );
    }, [OptionsRes]);

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
            <form
                onSubmit={e => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
            >
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
                                isLoading={isLoading}
                                handleSetTitle={handleSetTitle}
                                handleSetActionButtons={handleSetActionButtons}
                                formik={formik}
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
                                handleChangeStoreData={handleChangeStoreData}
                            />
                        }
                    />

                    <Route path="*" element={<Navigate to="/admin" replace />} />
                </Routes>
            </form>
        </>
    );
};

export default ManageStore;
