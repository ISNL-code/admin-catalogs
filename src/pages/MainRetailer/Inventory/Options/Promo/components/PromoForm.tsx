import { Box, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PromoTags from 'components/atoms/PromoTags/PromoTags';
import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { RetailerContextInterface } from 'types';

interface ValuesFormInterface {
    handleSetTitle;
    handleSetActionButtons;
    data;
    setValueData;
    formik;
}

const PromoForm = ({ handleSetTitle, handleSetActionButtons, data, setValueData, formik }: ValuesFormInterface) => {
    const { promoId } = useParams();
    const { string, storeData }: RetailerContextInterface = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        handleSetTitle(string?.promo);
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
                disabled: !storeData?.additionalStoreSettings?.promo,
                action: () => {},
            },
        ]); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeData]);

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
                            if (promoId) return;
                            setValueData({ ...data, code: e.target.value });
                        }}
                        size="small"
                        label={string?.code}
                        fullWidth
                        disabled={!!promoId}
                        error={formik.errors.code && formik.touched.code}
                        helperText={formik.errors.code}
                    />
                </Grid>
            </Grid>

            {data?.descriptions?.map(({ language, name, code }, idx) => (
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
                        <PromoTags size={20} selected value={name || code} code={data?.code} />
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
                                                description: `PROMO`,
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
                                    ? formik.errors.descriptions[idx]?.name && formik.touched.descriptions[idx]?.name
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

export default PromoForm;
