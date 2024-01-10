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
import { useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CreateDataStore, EditDataStore } from 'types';
import { COUNTRIES, CURRENCY, LANGUAGES } from 'constants/constants';
import dayjs from 'dayjs';
import { useEffect } from 'react';

const StoreForm = ({
    data,
    handleChangeStoreData,
    isLoading,
    handleSetTitle,
    handleSetActionButtons,
    formik,
}: {
    data: EditDataStore;
    handleChangeStoreData: (newData: any) => void;
    isLoading: boolean;
    handleSetTitle;
    handleSetActionButtons;
    formik;
}) => {
    const { storeCode } = useParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();

    useEffect(() => {
        handleSetTitle(storeCode);
    }, [data]);

    useEffect(() => {
        handleSetActionButtons([{ name: 'save', action: () => {} }]);
    }, [isLoading]);

    return (
        <Box>
            <Box>
                <Grid container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data.name || ''}
                            onChange={e => handleChangeStoreData({ name: e.target.value })}
                            size="small"
                            label={string?.store_name}
                            fullWidth
                            error={!!(formik.errors.name && formik.touched.name)}
                            helperText={formik.errors.name}
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data.code || ''}
                            error={!!(formik.errors.code && formik.touched.code)}
                            helperText={formik.errors.code}
                            onChange={e => handleChangeStoreData({ code: e.target.value })}
                            size="small"
                            label={string?.store_code}
                            fullWidth
                            disabled={!!storeCode}
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data.phone || ''}
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
                            value={data.email || ''}
                            type="email"
                            onChange={e => handleChangeStoreData({ email: e.target.value })}
                            size="small"
                            label={string?.store_email}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>{string?.store_country + '*'}</InputLabel>
                            <Select
                                value={data?.address?.country || ''}
                                onChange={e =>
                                    handleChangeStoreData({
                                        ...data,
                                        address: { ...data.address, country: e.target.value },
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
                            value={data?.address?.city || ''}
                            onChange={e =>
                                handleChangeStoreData({ address: { ...data.address, city: e.target.value } })
                            }
                            size="small"
                            label={string?.store_city}
                            fullWidth
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data?.address?.postalCode || ''}
                            type="number"
                            onChange={e =>
                                handleChangeStoreData({
                                    address: { ...data.address, postalCode: e.target.value },
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
                            value={data?.address?.stateProvince || ''}
                            onChange={e =>
                                handleChangeStoreData({
                                    address: { ...data.address, stateProvince: e.target.value },
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
                            value={data?.address?.address || ''}
                            onChange={e =>
                                handleChangeStoreData({
                                    address: { ...data.address, address: e.target.value },
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
                                value={dayjs(data.inBusinessSince) || ''}
                                onChange={e => {
                                    handleChangeStoreData({ inBusinessSince: e });
                                }}
                                label={string?.start_date_operation + '*'}
                                format="YYYY/MM/DD"
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        error: !dayjs(data.inBusinessSince),
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                        <FormControl fullWidth size="small">
                            <InputLabel>{string?.currency + '*'}</InputLabel>
                            <Select
                                value={data.currency || ''}
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
                            <InputLabel>{string?.default_language + '*'}</InputLabel>
                            <Select
                                value={data.defaultLanguage || ''}
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
                        <Typography variant="h3" sx={{ color: !data?.supportedLanguages?.length ? 'red' : '' }}>
                            {string?.supported_languages + '*'}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sx={{ p: 1, py: 1.25 }}>
                        {LANGUAGES.map(el => (
                            <FormControlLabel
                                key={el.id}
                                control={
                                    <Checkbox
                                        disabled={el.code === 'ua'}
                                        checked={!!data?.supportedLanguages?.some(lang => lang === el.code)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                handleChangeStoreData({
                                                    supportedLanguages: [...data.supportedLanguages, el.code],
                                                });
                                            } else {
                                                handleChangeStoreData({
                                                    supportedLanguages: data.supportedLanguages.filter(
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

                    {data?.supportedLanguages?.map((el, idx) => (
                        <Grid key={idx} xs={12} sx={{ p: 1, py: 1.25 }}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                disabled
                                value={data?.descriptions?.find(item => item.language === el)?.title || ''}
                                onChange={e => {}}
                                size="small"
                                label={string?.store_description + ' ' + el.toUpperCase()}
                                fullWidth
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default StoreForm;
