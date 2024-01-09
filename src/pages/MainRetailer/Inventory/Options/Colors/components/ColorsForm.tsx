import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { HexColorPicker } from 'react-colorful';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Box, TextField, Typography } from '@mui/material';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';

interface ValuesFormInterface {
    handleSetTitle;
    handleSetActionButtons;
    data;
    setValueData;
    formik;
}

const ColorsForm = ({ handleSetTitle, handleSetActionButtons, data, setValueData, formik }: ValuesFormInterface) => {
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const { string }: any = useOutletContext();
    const { sx } = useDevice();

    useEffect(() => {
        if (!data) return;
        if (data?.id) {
            handleSetTitle(string?.edit);
        } else {
            handleSetTitle(string?.create);
        }

        handleSetActionButtons([
            {
                name: 'cancel',
                disabled: false,
                action: () => {
                    navigate(-1);
                },
            },
            {
                name: 'save',
                disabled: false,
                action: () => {},
            },
        ]);
    }, [data]);

    return (
        <Grid mt={1} container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
            <Grid p={1} xs={sx ? 12 : 6}>
                <HexColorPicker
                    color={data?.code}
                    onChange={val => {
                        setValueData({ ...data, code: val });
                    }}
                    style={{ width: '100%', height: '275px' }}
                />

                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: sx ? 'wrap' : 'noWrap',
                        gap: 1,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                        <Box mt={2}>
                            <ColorIndicatorButton color={data?.code} size={40} />
                        </Box>

                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data?.code || ''}
                            onChange={e => {
                                setValueData({ ...data, code: e.target.value });
                            }}
                            size="small"
                            label={string?.code}
                            fullWidth
                            sx={{ mt: 2 }}
                            error={formik.errors.code && formik.touched.code}
                            helperText={formik.errors.code}
                        />
                    </Box>

                    <Box mt={sx ? 1 : 2} sx={{ width: sx ? '100%' : 'auto' }}>
                        <a
                            href="https://html5css.ru/colors/1-kody-cvetov-html.php"
                            target="_blank"
                            style={{
                                height: '40px',
                                padding: '6px 16px',
                                textDecoration: 'none',
                                borderRadius: 4,
                                backgroundColor: '#1976d2',
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography sx={{ color: 'white' }}>{string?.examples}</Typography>
                        </a>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={sx ? 12 : 6} p={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {data?.descriptions &&
                    data?.descriptions?.map(({ language, name }, idx) => (
                        <Grid
                            container
                            xs={12}
                            key={idx}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                background:
                                    idx % 2 !== 0
                                        ? `repeating-linear-gradient(
                                       45deg,
                                        #f3f3f378,
                                        #f3f3f378 5px,
                                        #fff 5px,
                                        #fff 10px
                                      )`
                                        : `repeating-linear-gradient(
                                135deg,
                                #f3f3f378,
                                #f3f3f378 5px,
                                #fff 5px,
                                #fff 10px
                              )`,
                                p: 2,
                                border: '1px solid #ccc',
                                borderBottom: '1px solid #ccc',
                            }}
                        >
                            <Grid xs={12} mb={-1}>
                                <Typography variant="h3">{language?.toUpperCase()}</Typography>
                            </Grid>
                            <Grid xs={12}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    value={name}
                                    onChange={e => {
                                        setValueData({
                                            ...data,
                                            descriptions: data.descriptions?.map(el => {
                                                if (el.language === language) {
                                                    return {
                                                        language,
                                                        name: e.target.value,
                                                        description: `COLOR`,
                                                        friendlyUrl: e.target.value,
                                                        keyWords: e.target.value,
                                                        highlights: e.target.value,
                                                        metaDescription: e.target.value,
                                                        title: e.target.value,
                                                    };
                                                }
                                                return { ...el };
                                            }),
                                        });
                                    }}
                                    size="small"
                                    label={string?.name}
                                    fullWidth
                                    error={
                                        formik?.errors.descriptions && formik.touched.descriptions
                                            ? formik.errors.descriptions[idx]?.name &&
                                              formik.touched.descriptions[idx]?.name
                                            : false
                                    }
                                    helperText={
                                        formik?.errors.descriptions ? formik.errors.descriptions[idx]?.name : ''
                                    }
                                />
                            </Grid>
                        </Grid>
                    ))}
            </Grid>
        </Grid>
    );
};

export default ColorsForm;
