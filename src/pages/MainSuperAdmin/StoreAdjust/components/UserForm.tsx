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
import { passwordValidate, validateCreateRetailer, validateEditRetailer } from 'helpers/validation';
import { useEffect } from 'react';
import { useUserApi } from 'api/useUserApi';
import Loader from 'components/atoms/Loader/Loader';

const UserForm = ({
    data,
    handleChangeUserData,
    submitForm,
    initialData,
    isLoading,
    handleSetTitle,
    handleSetActionButtons,
}: {
    data: RetailerStoreInterface;
    handleChangeUserData: (newData: any) => void;
    initialData?: RetailerStoreInterface;
    submitForm: (isValid: any, userID: any) => void;
    isLoading: boolean;
    handleSetTitle;
    handleSetActionButtons;
}) => {
    const navigate = useNavigate();
    const { storeCode, userId } = useParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();
    const isValid = () => {
        if (userId) {
            return validateEditRetailer(data);
        } else {
            return validateCreateRetailer(data);
        }
    };
    const { data: userDataRes, isFetching } = useUserApi().useGetUsersById({
        storeCode: storeCode,
        userId: userId,
    });

    useEffect(() => {
        handleSetTitle(userId ? data?.firstName : string?.create);
    }, []);

    useEffect(() => {
        handleSetActionButtons([
            {
                name: 'cancel',
                disabled: isLoading,
                action: () => {
                    navigate(-1);
                    handleChangeUserData(initialData);
                },
            },
            {
                name: 'save',
                disabled: !isValid() || isLoading,
                action: () => {
                    submitForm(isValid, userId);
                },
            },
        ]);
    }, [isLoading, isValid, initialData]);

    useEffect(() => {
        if (!userDataRes || isFetching) return;

        const user = userDataRes.data;

        handleChangeUserData({
            firstName: user.firstName,
            lastName: user.lastName,
            store: user.merchant,
            userName: user.userName,
            emailAddress: user.emailAddress,
            active: user.active,
            defaultLanguage: user.defaultLanguage,
            groups: user.groups,
            //add
            phone: user.phone,
            manager: user.manager,
            telegram: user.telegram,
            viber: user.viber,
            whatsApp: user.whatsApp,
        });
    }, [userDataRes, userId]);

    return (
        <>
            {isFetching && <Loader />}

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
                                        checked={!!data.manager}
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
                                        checked={!!data.active}
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
                            value={data.firstName}
                            error={!data.firstName}
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
                            value={data.lastName}
                            error={!data.lastName}
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
                            value={data.emailAddress}
                            error={!data.emailAddress}
                            onChange={e =>
                                handleChangeUserData({ emailAddress: e.target.value, userName: e.target.value })
                            }
                            size="small"
                            disabled={!!userId}
                            required
                            label={string?.email}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data.phone}
                            error={!data.phone}
                            type="tel"
                            onChange={e => handleChangeUserData({ phone: e.target.value })}
                            size="small"
                            required
                            label={string?.phone_number + ' Надо добавить'}
                            fullWidth
                        />
                    </Grid>

                    {!userId && (
                        <>
                            <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    value={data.password}
                                    error={!passwordValidate(data.password || '')}
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
                                    value={data.repeatPassword}
                                    type="password"
                                    error={!data.repeatPassword || data.repeatPassword !== data.password}
                                    helperText={
                                        data.repeatPassword !== data.password ? string?.passwords_do_not_match : ''
                                    }
                                    onChange={e => handleChangeUserData({ repeatPassword: e.target.value })}
                                    size="small"
                                    required
                                    label={string?.confirm_password}
                                    fullWidth
                                />
                            </Grid>
                        </>
                    )}
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel error={!data.defaultLanguage}>{string?.default_language + '*'}</InputLabel>
                            <Select
                                value={data.defaultLanguage}
                                error={!data.defaultLanguage}
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
                            value={data.telegram}
                            onChange={e => handleChangeUserData({ telegram: e.target.value })}
                            size="small"
                            label={'Telegram'}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data.viber}
                            onChange={e => handleChangeUserData({ viber: e.target.value })}
                            size="small"
                            label={'Viber'}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data.whatsApp}
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

export default UserForm;
