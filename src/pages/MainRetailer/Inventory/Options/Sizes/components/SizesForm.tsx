import { Box, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import SizesIndicatorButton from 'components/atoms/SizesIndicatorButton/SizesIndicatorButton';
import { useDevice } from 'hooks/useDevice';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';

interface ValuesFormInterface {
    handleSetTitle;
    handleSetActionButtons;
    data;
    setValueData;
    formik;
}

const SizesForm = ({ handleSetTitle, handleSetActionButtons, data, setValueData, formik }: ValuesFormInterface) => {
    const { storeCode, sizeId } = useParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        handleSetTitle(string?.sizes);
        handleSetActionButtons([
            {
                name: 'cancel',
                disabled: false,
                action: () => {
                    navigate(`/store-inventory/${storeCode}/options/sizes`);
                },
            },
            {
                name: 'save',
                disabled: false,
                action: () => {},
            },
        ]);
    }, []);

    return (
        <Box
            mt={1}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Grid mt={1} container xs={12} p={1} sx={{ border: '1px solid #ccc' }}>
                <Grid xs={12} p={1}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        value={data?.code || ''}
                        name="code"
                        onChange={e => {
                            if (sizeId) return;
                            setValueData({ ...data, code: e.target.value });
                        }}
                        size="small"
                        label={string?.code}
                        fullWidth
                        disabled={!!sizeId}
                        error={formik.errors.code && formik.touched.code}
                        helperText={formik.errors.code}
                    />
                </Grid>
            </Grid>

            {data?.descriptions &&
                data?.descriptions?.map(({ language, name }, idx) => (
                    <Grid
                        container
                        xs={12}
                        key={idx}
                        sx={{
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
                        <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SizesIndicatorButton label={name} size={36} disabled />
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
                                                    description: 'SIZE',
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
                                helperText={formik?.errors.descriptions ? formik.errors.descriptions[idx]?.name : ''}
                            />
                        </Grid>
                    </Grid>
                ))}
        </Box>
    );
};

export default SizesForm;
