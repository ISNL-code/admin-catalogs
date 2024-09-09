import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { HexColorPicker } from 'react-colorful';
import Grid from '@mui/material/Unstable_Grid2';
import { useDevice } from 'hooks/useDevice';
import { Box, Button, TextField, Typography } from '@mui/material';
import ColorIndicatorButton from 'components/atoms/ColorIndicatorButton/ColorIndicatorButton';
import { RetailerContextInterface } from 'types';
import { handleTranslate } from 'helpers/handleTranslate';
import { useGoogleApi } from 'api/useGoogleApi';

interface ValuesFormInterface {
    handleSetTitle;
    handleSetActionButtons;
    data;
    setValueData;
    formik;
}

const ColorsForm = ({ handleSetTitle, handleSetActionButtons, data, setValueData, formik }: ValuesFormInterface) => {
    const navigate = useNavigate();
    const { string, TranslatedMode }: RetailerContextInterface = useOutletContext();
    const { sx } = useDevice();
    const { mutateAsync: translateText } = useGoogleApi()?.useTranslateText();
    const [rootLanguage, setRootLanguage] = useState<string | null>(null);
    const [rootName, setRootName] = useState<string | null>(null);
    const [rootDescription, setRootDescription] = useState<string | null>(null); // eslint-disable-line

    useEffect(() => {
        if (!TranslatedMode) return;
        if (!data?.descriptions) return;
        setRootLanguage(data?.descriptions[0]?.language);
        setRootName(data?.descriptions[0]?.name);
        setRootDescription(data?.descriptions[0]?.description);
    }, [data?.descriptions]); // eslint-disable-line

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
        ]); // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            helperText={string?.[formik.errors.code]}
                        />
                    </Box>
                </Box>
            </Grid>

            <Grid xs={sx ? 12 : 6} p={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {TranslatedMode && (
                    <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            sx={{ ml: 'auto' }}
                            onClick={() => {
                                handleTranslate({
                                    data,
                                    rootLanguage,
                                    translateText,
                                    rootName,
                                    rootDescription: null,
                                    setAction: setValueData,
                                });
                            }}
                        >
                            Translate
                        </Button>
                    </Grid>
                )}
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
                                        formik?.errors.descriptions
                                            ? string?.[formik.errors.descriptions[idx]?.name]
                                            : ''
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
