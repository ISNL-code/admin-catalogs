import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { RetailerStoreInterface } from 'types';
import { LANGUAGES } from 'constants/constants';
import { useEffect, useState } from 'react';
import { useUserApi } from 'api/useUserApi';
import Loader from 'components/atoms/Loader/Loader';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import toast from 'react-hot-toast';
import StoresTabsPanel from 'components/organisms/Panels/StoresTabsPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useFormik } from 'formik';
import editUserFormValidations from 'helpers/Validations/editUserFormValidations';
import { USERS_DATA } from 'dataBase/USERS';

const EditUser = () => {
    const navigate = useNavigate();
    const { storeCode, userId } = useParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();
    const [usersData, setUsersData] = useState<RetailerStoreInterface | any>(null);
    const [userNameInit, setUserNameInit] = useState('');

    const { mutateAsync: updateUser, isLoading: loadUpdateUser } = useUserApi().useUpdateUser();

    const { data: userDataRes, isFetching } = useUserApi().useGetUsersById({
        storeCode: storeCode,
        userId: userId,
    });

    const formik = useFormik({
        initialValues: usersData,
        validationSchema: editUserFormValidations,
        onSubmit: values => {
            updateUser({ ...values, id: usersData.id })
                .then(res => {
                    if (res.status === 200) toast.success(string?.updated);
                    navigate(-1);
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                });
        },
    });

    useEffect(() => {
        formik.setValues(usersData);
    }, [usersData]);

    useEffect(() => {
        if (!userDataRes || isFetching) return;

        const user = userDataRes.data;

        handleChangeUserData({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            store: user.merchant,
            userName: user.userName,
            emailAddress: user.emailAddress,
            active: user.active,
            defaultLanguage: user.defaultLanguage,
            groups: user.groups,
            //add
            ...USERS_DATA.find(({ emailAddress }) => emailAddress === user.emailAddress),
        });
        setUserNameInit(user.firstName);
    }, [userDataRes, userId]);

    const handleChangeUserData = newData => {
        setUsersData({ ...usersData, ...newData });
    };
    console.log(usersData);
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            {(loadUpdateUser || isFetching) && <Loader />}

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
            <PageHeader title={string?.edit}>
                <ActionPanel
                    button={[
                        {
                            name: 'cancel',
                            action: () => {
                                navigate(-1);
                                handleChangeUserData(null);
                            },
                        },
                        {
                            name: 'save',
                            action: () => {},
                        },
                    ]}
                />
            </PageHeader>
            <Grid mt={1} container xs={12} sx={{ gap: 2, border: '1px solid #ccc', p: 2 }}>
                <Grid container xs={12} sx={{ justifyContent: 'space-between' }}>
                    <Grid xs={sx ? 'auto' : 6} sx={{ p: 1 }}>
                        <Typography variant={sx ? 'h3' : 'h2'}>{userNameInit}</Typography>
                    </Grid>
                    <Grid
                        xs={sx ? 'auto' : 6}
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: sx ? 'column' : 'row',
                            alignItems: sx ? 'flex-start' : 'center',
                            justifyContent: sx ? 'flex-start' : 'flex-end',
                        }}
                    >
                        <Grid xs={sx ? 12 : 6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!usersData?.options?.manager}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                handleChangeUserData({
                                                    manager: true,
                                                });
                                            } else {
                                                handleChangeUserData({
                                                    manager: false,
                                                });
                                            }
                                        }}
                                    />
                                }
                                label={string?.manager}
                                disabled
                            />
                        </Grid>
                        <Grid xs={sx ? 12 : 6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!usersData?.active}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                handleChangeUserData({
                                                    active: true,
                                                });
                                            } else {
                                                handleChangeUserData({
                                                    active: false,
                                                });
                                            }
                                        }}
                                    />
                                }
                                label={string?.active}
                            />
                        </Grid>
                    </Grid>

                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData?.firstName || ''}
                            onChange={e => handleChangeUserData({ firstName: e.target.value })}
                            size="small"
                            label={string?.first_name}
                            fullWidth
                            error={!!(formik.errors.firstName && formik.touched.firstName)}
                            helperText={!!formik.errors.firstName}
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData?.lastName || ''}
                            onChange={e => handleChangeUserData({ lastName: e.target.value })}
                            size="small"
                            label={string?.last_name}
                            fullWidth
                            error={!!(formik.errors.lastName && formik.touched.lastName)}
                            helperText={!!formik.errors.lastName}
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData?.emailAddress || ''}
                            size="small"
                            disabled={!!userId}
                            label={string?.email}
                            fullWidth
                            error={!!(formik.errors.emailAddress && formik.touched.emailAddress)}
                            helperText={!!formik.errors.emailAddress}
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData?.contacts?.phone || ''}
                            type="tel"
                            onChange={e => handleChangeUserData({ phone: e.target.value })}
                            size="small"
                            label={string?.phone_number}
                            fullWidth
                            disabled
                        />
                    </Grid>

                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel error={!usersData?.defaultLanguage}>
                                {string?.default_language + '*'}
                            </InputLabel>
                            <Select
                                value={usersData?.defaultLanguage}
                                error={!usersData?.defaultLanguage}
                                onChange={e => handleChangeUserData({ defaultLanguage: e.target.value })}
                                label={string?.default_language + '*'}
                            >
                                {LANGUAGES.map(el => (
                                    <MenuItem key={el?.id} value={el?.code}>
                                        {el?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData?.contacts?.telegram || ''}
                            onChange={e => handleChangeUserData({ telegram: e.target.value })}
                            size="small"
                            label={'Telegram'}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData?.contacts?.viber || ''}
                            onChange={e => handleChangeUserData({ viber: e.target.value })}
                            size="small"
                            label={'Viber'}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData?.contacts?.whatsapp || ''}
                            onChange={e => handleChangeUserData({ whatsApp: e.target.value })}
                            size="small"
                            label={'Whatsapp'}
                            fullWidth
                            disabled
                        />
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default EditUser;
