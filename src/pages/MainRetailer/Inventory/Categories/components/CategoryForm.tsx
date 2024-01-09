import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useOutletContext } from 'react-router-dom';
import { RetailerContextInterface } from 'types';

const CategoryForm = ({ data, selectedCategory, formik, setSelectedCategory, setMode, handleSetInitValues }) => {
    const { string }: RetailerContextInterface = useOutletContext();

    return (
        <Grid container xs={12}>
            <Grid
                xs={12}
                mb={1}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}
            >
                <Box p={1}>
                    {selectedCategory?.id ? (
                        <Typography variant="h3">{data?.code}</Typography>
                    ) : (
                        <Typography variant="h3">{string?.create_category}</Typography>
                    )}
                </Box>
                <Box p={1} sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                            setMode('view');
                            handleSetInitValues();
                        }}
                    >
                        {string?.cancel}
                    </Button>
                    <Button variant="contained" type="submit">
                        {string?.save}
                    </Button>
                </Box>
            </Grid>
            <Grid p={1} xs={8}>
                <TextField
                    autoFocus
                    focused
                    InputLabelProps={{ shrink: true }}
                    value={data?.code || ''}
                    name="code"
                    onChange={e => {
                        if (data.id) return;
                        setSelectedCategory({ ...data, code: e.target.value });
                    }}
                    size="small"
                    label={string?.code}
                    fullWidth
                    disabled={!!selectedCategory?.id}
                    error={formik.errors.code && formik.touched.code}
                    helperText={formik.errors.code}
                />
            </Grid>
            <Grid p={1} xs={4}>
                <TextField
                    type="number"
                    autoFocus={!!selectedCategory?.id}
                    focused
                    InputLabelProps={{ shrink: true }}
                    value={data?.sortOrder || ''}
                    name="code"
                    onChange={e => {
                        setSelectedCategory({ ...data, sortOrder: e.target.value });
                    }}
                    size="small"
                    label={string?.order_priority}
                    fullWidth
                />
            </Grid>
            {data?.descriptions &&
                data?.descriptions?.map(({ language, name }, idx) => (
                    <Grid
                        m={1}
                        p={2}
                        container
                        xs={12}
                        key={idx}
                        sx={{
                            display: 'flex',
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
                                value={name || ''}
                                onChange={e => {
                                    setSelectedCategory({
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
        </Grid>
    );
};

export default CategoryForm;
