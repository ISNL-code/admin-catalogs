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
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CreateDataStore } from 'types';
import { COUNTRIES, CURRENCY, LANGUAGES } from 'constants/constants';
import dayjs from 'dayjs';
import ActionPanel from '../../../components/organisms/Panels/ActionPanel';
import { useEffect, useState } from 'react';
import { useStoresApi } from 'api/useStoresApi';
import toast from 'react-hot-toast';
import StoresTabsPanel from 'components/organisms/Panels/StoresTabsPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useFormik } from 'formik';
import storeFormValidations from 'helpers/Validations/storeFormValidations';
import { useOptionsApi } from 'api/useOptionsApi';

const INITIAL_STORE_DATA = {
    name: '',
    code: '',
    phone: '',
    email: '',
    address: {
        searchControl: '',
        stateProvince: '',
        country: '',
        address: '',
        postalCode: '',
        city: '',
    },
    supportedLanguages: [],
    defaultLanguage: 'en',
    currency: 'USD',
    currencyFormatNational: false, //not in use
    weight: 'KG', //not in use
    dimension: 'CM', //not in use
    inBusinessSince: new Date(),
    useCache: false, //not in use
    retailer: false, //not in use
};

const CreateStore = () => {
    const navigate = useNavigate();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();
    const [storeData, setStoreData] = useState<CreateDataStore>(INITIAL_STORE_DATA);

    const { refetch: checkUnique } = useStoresApi().useCheckUniqueStoreCode({
        code: storeData.code,
    });

    const { mutateAsync: createStore } = useStoresApi().useCreateStore();
    const { mutateAsync: createOption } = useOptionsApi().useCreateOption();

    const formik = useFormik({
        initialValues: storeData,
        validationSchema: storeFormValidations,
        onSubmit: values => {
            checkUnique()
                .then(res => {
                    if ((res as any).data.data.exists) {
                        toast.error(string?.store_with_this_code_is_registered);
                        return;
                    }
                    return res;
                })
                .then(res => {
                    if (res) {
                        createStore(values)
                            .then(res => {
                                if (res.status === 200) {
                                    toast.success(string?.created);

                                    createOption({
                                        storeCode: values.code,
                                        data: {
                                            code: `SIZE`,
                                            type: 'select',
                                            selectedLanguage: '',
                                            descriptions: storeData.supportedLanguages.map(el => {
                                                return { language: el, name: `SIZE` };
                                            }),
                                        },
                                    });

                                    createOption({
                                        storeCode: values.code,
                                        data: {
                                            code: `COLOR`,
                                            type: 'select',
                                            selectedLanguage: '',
                                            descriptions: storeData.supportedLanguages.map(el => {
                                                return { language: el, name: `COLOR` };
                                            }),
                                        },
                                    });

                                    createOption({
                                        storeCode: values.code,
                                        data: {
                                            code: `PROMO`,
                                            type: 'select',
                                            selectedLanguage: '',
                                            descriptions: storeData.supportedLanguages.map(el => {
                                                return { language: el, name: `PROMO` };
                                            }),
                                        },
                                    });
                                }
                                navigate(`/admin/store/manage/${storeData.code}/main`);
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
        formik.setValues(storeData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeData]);

    const handleChangeStoreData = newData => {
        setStoreData({ ...storeData, ...newData });
    };

    return (
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
                        path: `/admin/store/create`,
                        disabled: false,
                    },
                    { name: 'users', path: `/`, disabled: true },
                    { name: 'options', path: `/`, disabled: true },
                ]}
            />
            <PageHeader title={string?.create_store}>
                <ActionPanel
                    button={[
                        {
                            name: 'save',
                            action: () => {},
                        },
                    ]}
                />
            </PageHeader>
            <Box>
                <Grid container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={storeData.name}
                            onChange={e => handleChangeStoreData({ name: e.target.value })}
                            size="small"
                            name="name"
                            label={string?.store_name}
                            fullWidth
                            error={!!(formik.errors.name && formik.touched.name)}
                            helperText={string?.[formik.errors.name as string]}
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={storeData.code}
                            onChange={e => handleChangeStoreData({ code: e.target.value })}
                            size="small"
                            label={string?.store_code}
                            fullWidth
                            error={!!(formik.errors.code && formik.touched.code)}
                            helperText={string?.[formik.errors.code as any]}
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={storeData.phone}
                            onChange={e => handleChangeStoreData({ phone: e.target.value })}
                            type="tel"
                            size="small"
                            label={string?.store_phone}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={storeData.email}
                            type="email"
                            onChange={e => handleChangeStoreData({ email: e.target.value })}
                            size="small"
                            label={string?.store_email}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel error={!storeData.address.country}>{string?.store_country + '*'}</InputLabel>
                            <Select
                                error={!storeData.address.country}
                                value={storeData.address.country}
                                onChange={e =>
                                    handleChangeStoreData({
                                        ...storeData,
                                        address: { ...storeData.address, country: e.target.value },
                                    })
                                }
                                label={string?.store_country + '*'}
                            >
                                {COUNTRIES.map(el => (
                                    <MenuItem key={el.id} value={el.code}>
                                        {el.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={storeData.address.city}
                            onChange={e =>
                                handleChangeStoreData({ address: { ...storeData.address, city: e.target.value } })
                            }
                            size="small"
                            label={string?.store_city}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={storeData.address.postalCode}
                            type="number"
                            onChange={e =>
                                handleChangeStoreData({
                                    address: { ...storeData.address, postalCode: e.target.value },
                                })
                            }
                            size="small"
                            label={string?.postal_code}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={storeData.address.stateProvince}
                            onChange={e =>
                                handleChangeStoreData({
                                    address: { ...storeData.address, stateProvince: e.target.value },
                                })
                            }
                            size="small"
                            label={string?.store_state_province}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={storeData.address.address}
                            onChange={e =>
                                handleChangeStoreData({
                                    address: { ...storeData.address, address: e.target.value },
                                })
                            }
                            size="small"
                            label={string?.store_address}
                            fullWidth
                        />
                    </Grid>

                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={dayjs(storeData.inBusinessSince)}
                                onChange={e => {
                                    handleChangeStoreData({ inBusinessSince: e });
                                }}
                                label={string?.start_date_operation + '*'}
                                format="YYYY/MM/DD"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        error: !dayjs(storeData.inBusinessSince),
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel error={!storeData.currency}>{string?.currency + '*'}</InputLabel>
                            <Select
                                value={storeData.currency}
                                error={!storeData.currency}
                                onChange={e => handleChangeStoreData({ currency: e.target.value })}
                                label={string?.currency + '*'}
                            >
                                {CURRENCY.map(el => (
                                    <MenuItem key={el.id} value={el.code}>
                                        {el.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel error={!storeData.defaultLanguage}>{string?.default_language + '*'}</InputLabel>
                            <Select
                                value={storeData.defaultLanguage}
                                onChange={e => handleChangeStoreData({ defaultLanguage: e.target.value })}
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
                    <Grid xs={12} sx={{ px: 1 }}>
                        <Typography variant="h3" sx={{ color: !storeData.supportedLanguages.length ? 'red' : '' }}>
                            {string?.supported_languages + '*'}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sx={{ p: 1, py: 1.25 }}>
                        {LANGUAGES.map(el => (
                            <FormControlLabel
                                key={el.id}
                                control={
                                    <Checkbox
                                        checked={!!storeData.supportedLanguages.some(lang => lang === el.code)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                handleChangeStoreData({
                                                    supportedLanguages: [...storeData.supportedLanguages, el.code],
                                                });
                                            } else {
                                                handleChangeStoreData({
                                                    supportedLanguages: storeData.supportedLanguages.filter(
                                                        lang => el.code !== lang
                                                    ),
                                                });
                                            }
                                        }}
                                    />
                                }
                                label={el.code.toUpperCase()}
                            />
                        ))}
                    </Grid>

                    {storeData.supportedLanguages.map((el, idx) => (
                        <Grid key={idx} xs={12} sx={{ p: 1, py: 1.25 }}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled
                                value={'Feature'}
                                onChange={e => {}}
                                size="small"
                                label={string?.store_description + ' ' + el.toUpperCase()}
                                fullWidth
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </form>
    );
};

export default CreateStore;
