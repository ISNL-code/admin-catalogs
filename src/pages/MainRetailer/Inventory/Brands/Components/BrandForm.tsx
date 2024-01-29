import { Box, TextField, Typography } from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';
import { EditBrandInterface, MainContextInterface, RetailerContextInterface } from 'types';

const BrandForm = ({
    handleSetTitle,
    data,
    handleSetActionButtons,
    formik,
    setBrand,
}: {
    handleSetTitle?;
    data: EditBrandInterface | null;
    handleSetActionButtons;
    formik: any;
    setBrand;
}) => {
    const navigate = useNavigate();
    const { brandId } = useParams();
    const { sx } = useDevice();
    const { string }: MainContextInterface | RetailerContextInterface = useOutletContext();

    useEffect(() => {
        if (brandId) {
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
    }, []);

    return (
        <>
            <Box
                mt={1}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Grid mt={1} container xs={12} p={1} sx={{ border: '1px solid #ccc' }}>
                    <Grid xs={sx ? 6 : 6} p={1}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data?.code}
                            name="code"
                            onChange={e => {
                                if (brandId) return;
                                setBrand({ ...data, code: e.target.value });
                            }}
                            size="small"
                            label={string?.code}
                            fullWidth
                            disabled={!!brandId}
                            error={formik.errors.code && formik.touched.code}
                            helperText={formik.errors.code}
                        />
                    </Grid>
                    <Grid xs={sx ? 6 : 6} p={1}>
                        <TextField
                            type="number"
                            InputLabelProps={{ shrink: true }}
                            value={data?.order}
                            error={false}
                            helperText={''}
                            onChange={e => {
                                setBrand({ ...data, order: e.target.value });
                            }}
                            size="small"
                            label={string?.order_priority}
                            fullWidth
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
                            <Grid xs={12}>
                                <TextField
                                    InputLabelProps={{ shrink: true }}
                                    value={name}
                                    onChange={e => {
                                        setBrand({
                                            ...data,
                                            descriptions: data.descriptions?.map(el => {
                                                if (el.language === language) {
                                                    return {
                                                        ...el,
                                                        name: e.target.value,
                                                        description: e.target.value,
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
                                            ? formik.errors.descriptions[idx]?.description &&
                                              formik.touched.descriptions[idx]?.description
                                            : false
                                    }
                                    helperText={
                                        formik?.errors.descriptions ? formik.errors.descriptions[idx]?.description : ''
                                    }
                                />
                            </Grid>
                        </Grid>
                    ))}
            </Box>
        </>
    );
};

export default BrandForm;
