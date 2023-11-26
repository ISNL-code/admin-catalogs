import {
    Box,
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
import { passwordValidate, validateCreateRetailer } from 'helpers/validation';
import { useUserApi } from 'api/useUserApi';
import Loader from 'components/atoms/Loader/Loader';
import StoresTabsPanel from 'components/organisms/Panels/StoresTabsPanel';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import toast from 'react-hot-toast';
import { useState } from 'react';
import PageHeader from 'components/organisms/Panels/PageHeader';

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
    phone: '',
    manager: false,
    telegram: '',
    viber: '',
    whatsApp: '',
};

const CreateUser = () => {
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();
    const [usersData, setUsersData] = useState<RetailerStoreInterface>(INITIAL_USER_DATA);
    const isValid = () => validateCreateRetailer(usersData);

    const { mutateAsync: checkUniqueEmail } = useUserApi().useCheckUniqueEmailCode();
    const { mutateAsync: createUser, isLoading } = useUserApi().useCreateUser();

    const submitForm = () => {
        if (!isValid()) return;

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
                    createUser({ ...usersData, store: storeCode })
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
    };

    const handleChangeUserData = newData => {
        setUsersData({ ...usersData, ...newData });
    };

    return (
        <>
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
                            disabled: !isValid() || isLoading,
                            action: () => {
                                submitForm();
                            },
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
                                        checked={!!usersData.manager}
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
                                sx={{
                                    '.MuiTypography-root': {
                                        color: 'red',
                                    },
                                }}
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
                            error={!usersData.firstName}
                            onChange={e => handleChangeUserData({ firstName: e.target.value })}
                            size="small"
                            label={string?.first_name}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData.lastName}
                            error={!usersData.lastName}
                            onChange={e => handleChangeUserData({ lastName: e.target.value })}
                            size="small"
                            required
                            label={string?.last_name}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData.emailAddress}
                            error={!usersData.emailAddress}
                            onChange={e =>
                                handleChangeUserData({ emailAddress: e.target.value, userName: e.target.value })
                            }
                            size="small"
                            required
                            label={string?.email}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData.phone}
                            error={!usersData.phone}
                            type="tel"
                            onChange={e => handleChangeUserData({ phone: e.target.value })}
                            size="small"
                            required
                            label={string?.phone_number + ' Надо добавить'}
                            fullWidth
                        />
                    </Grid>

                    {
                        <>
                            <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    value={usersData.password}
                                    error={!passwordValidate(usersData.password || '')}
                                    type="password"
                                    helperText={
                                        string?.should_contains_1_character_lowercase_1_character_uppercase_1_digit_6_to_12_characters
                                    }
                                    onChange={e => handleChangeUserData({ password: e.target.value })}
                                    size="small"
                                    required
                                    label={string?.password}
                                    fullWidth
                                />
                            </Grid>
                            <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    value={usersData.repeatPassword}
                                    type="password"
                                    error={!usersData.repeatPassword || usersData.repeatPassword !== usersData.password}
                                    helperText={
                                        usersData.repeatPassword !== usersData.password
                                            ? string?.passwords_do_not_match
                                            : ''
                                    }
                                    onChange={e => handleChangeUserData({ repeatPassword: e.target.value })}
                                    size="small"
                                    required
                                    label={string?.confirm_password}
                                    fullWidth
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
                            value={usersData.telegram}
                            onChange={e => handleChangeUserData({ telegram: e.target.value })}
                            size="small"
                            label={'Telegram'}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData.viber}
                            onChange={e => handleChangeUserData({ viber: e.target.value })}
                            size="small"
                            label={'Viber'}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={usersData.whatsApp}
                            onChange={e => handleChangeUserData({ whatsApp: e.target.value })}
                            size="small"
                            label={'Whatsapp'}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CreateUser;
