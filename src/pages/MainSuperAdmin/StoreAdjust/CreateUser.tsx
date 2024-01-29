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
import { useUserApi } from 'api/useUserApi';
import Loader from 'components/atoms/Loader/Loader';
import StoresTabsPanel from 'components/organisms/Panels/StoresTabsPanel';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useFormik } from 'formik';
import createUserFormValidations from 'helpers/Validations/createUserFormValidations';

const INITIAL_USER_DATA = {
    firstName: '',
    lastName: '',
    store: '',
    userName: '',
    emailAddress: '',
    password: '',
    repeatPassword: '',
    active: false,
    defaultLanguage: 'ua',
    groups: [
        {
            id: 3,
            name: 'ADMIN_RETAIL',
        },
    ],
    //add
    options: { manager: false },
    contacts: { phone: '', viber: '', whatsapp: '', telegram: '' },
};

const CreateUser = () => {
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();
    const [usersData, setUsersData] = useState<RetailerStoreInterface | any>(INITIAL_USER_DATA);

    const { mutateAsync: checkUniqueEmail } = useUserApi().useCheckUniqueEmailCode();
    const { mutateAsync: createUser, isLoading } = useUserApi().useCreateUser();

    const formik = useFormik({
        initialValues: usersData,
        validationSchema: createUserFormValidations,
        onSubmit: values => {
            checkUniqueEmail({
                unique: usersData.emailAddress,
            })
                .then(res => {
                    if ((res as any).data.exists) {
                        toast.error(string?.user_with_this_email_is_registered);
                        return;
                    }
                    return res;
                })
                .then(res => {
                    if (res) {
                        createUser({ storeCode, data: { ...values, store: storeCode } })
                            .then(_ => {
                                if (res.status === 200) toast.success(string?.created);
                                navigate(-1);
                            })
                            .catch(err => {
                                console.log(err);
                                toast.error(err.message);
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
        formik.setValues(usersData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersData]);

    const handleChangeUserData = newData => {
        setUsersData({ ...usersData, ...newData });
    };

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            {isLoading && <Loader />}

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
            <PageHeader title={string?.create}>
                <ActionPanel
                    button={[
                        {
                            name: 'cancel',
                            disabled: isLoading,
                            action: () => {
                                navigate(-1);
                                handleChangeUserData(INITIAL_USER_DATA);
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
                        <Typography variant={sx ? 'h3' : 'h2'}>{string?.user}</Typography>
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
                                label={string?.manager + '(Feature)'}
                                disabled
                            />
                        </Grid>
                        <Grid xs={sx ? 12 : 6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!usersData.active}
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
                            value={usersData.firstName}
                            onChange={e => handleChangeUserData({ firstName: e.target.value })}
                            size="small"
                            label={string?.first_name}
                            fullWidth
                            error={!!(formik.errors.firstName && formik.touched.firstName)}
                            helperText={formik.errors.firstName as any}
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData.lastName}
                            onChange={e => handleChangeUserData({ lastName: e.target.value })}
                            size="small"
                            label={string?.last_name}
                            fullWidth
                            error={!!(formik.errors.lastName && formik.touched.lastName)}
                            helperText={formik.errors.lastName as any}
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData.emailAddress}
                            onChange={e =>
                                handleChangeUserData({ emailAddress: e.target.value, userName: e.target.value })
                            }
                            size="small"
                            label={string?.email}
                            fullWidth
                            error={!!(formik.errors.emailAddress && formik.touched.emailAddress)}
                            helperText={formik.errors.emailAddress as any}
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            type="tel"
                            onChange={e => handleChangeUserData({ phone: e.target.value })}
                            size="small"
                            label={string?.phone_number}
                            fullWidth
                            value={'Feature'}
                            disabled
                        />
                    </Grid>

                    {
                        <>
                            <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    value={usersData.password}
                                    type="password"
                                    onChange={e => handleChangeUserData({ password: e.target.value })}
                                    size="small"
                                    label={string?.password}
                                    fullWidth
                                    error={!!(formik.errors.password && formik.touched.password)}
                                    helperText={formik.errors.password as any}
                                />
                            </Grid>
                            <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    value={usersData.repeatPassword}
                                    type="password"
                                    onChange={e => handleChangeUserData({ repeatPassword: e.target.value })}
                                    size="small"
                                    label={string?.confirm_password}
                                    fullWidth
                                    error={!!(formik.errors.repeatPassword && formik.touched.repeatPassword)}
                                    helperText={formik.errors.repeatPassword as any}
                                />
                            </Grid>
                        </>
                    }
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel error={!usersData.defaultLanguage}>{string?.default_language + '*'}</InputLabel>
                            <Select
                                value={usersData.defaultLanguage}
                                error={!usersData.defaultLanguage}
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
                            value={'Feature'}
                            disabled
                            onChange={e => handleChangeUserData({ telegram: e.target.value })}
                            size="small"
                            label={'Telegram'}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={'Feature'}
                            disabled
                            onChange={e => handleChangeUserData({ viber: e.target.value })}
                            size="small"
                            label={'Viber'}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={'Feature'}
                            disabled
                            onChange={e => handleChangeUserData({ whatsApp: e.target.value })}
                            size="small"
                            label={'Whatsapp'}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default CreateUser;
