import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import { BrandsInterface, MainContextInterface, ManageProductInterface, RetailerContextInterface } from 'types';
import AddIcon from '@mui/icons-material/Add';
import { getCurrencySymbol } from 'helpers/getCurrencySymbol';
import { useEffect, useState } from 'react';
import { useGoogleApi } from 'api/useGoogleApi';

const ProductGeneral = ({
    data,
    formik,
    brandsList,
    setProduct,
}: {
    data: ManageProductInterface | null;
    formik: any;
    brandsList: BrandsInterface[];
    setProduct: any;
}) => {
    const navigate = useNavigate();
    const { mutateAsync: translateText } = useGoogleApi()?.useTranslateText();
    const { storeCode } = useParams();
    const { sx } = useDevice();
    const { string, storeData, TranslatedMode }: MainContextInterface | RetailerContextInterface = useOutletContext();
    const [rootLanguage, setRootLanguage] = useState<string | null>(null);
    const [rootName, setRootName] = useState<string | null>(null);
    const [rootDescription, setRootDescription] = useState<string | null>(null);

    // set root language for future translation
    useEffect(() => {
        if (!data?.descriptions) return;
        setRootLanguage(data?.descriptions[0]?.language);
        setRootName(data?.descriptions[0]?.name);
        setRootDescription(data?.descriptions[0]?.description);
    }, [data?.descriptions]);

    const langGetOriginalCode = [
        { code: 'en', id: 1, name: 'English', original: 'en' },
        { code: 'fr', id: 2, name: 'French', original: 'fr' },
        { code: 'es', id: 3, name: 'Spain', original: 'es' },
        { code: 'ua', id: 4, name: 'Ukrainian', original: 'uk' },
        { code: 'ru', id: 5, name: 'Russian', original: 'ru' },
        { code: 'pl', id: 6, name: 'Polish', original: 'pl' },
        { code: 'cz', id: 7, name: 'Czech', original: 'cs' },
        { code: 'kz', id: 8, name: 'Kazakh', original: 'kk' },
        { code: 'it', id: 9, name: 'Italian', original: 'it' },
        { code: 'tk', id: 10, name: 'Turkish', original: 'tk' },
        { code: 'de', id: 11, name: 'Deutsche', original: 'de' },
        { code: 'fi', id: 11, name: 'Fin', original: 'fi' },
    ];

    const handleTranslate = async () => {
        if (!data?.descriptions) return;
        const translations = await Promise.all(
            data.descriptions.map(async item => {
                if (item?.language === rootLanguage) return item;

                const getOriginCode =
                    langGetOriginalCode.find(el => el?.code === item?.language)?.original || item?.language;

                const nameTranslation = await translateText({ text: rootName, lang: getOriginCode });
                const descriptionTranslation = await translateText({ text: rootDescription, lang: getOriginCode });

                return {
                    ...item,
                    name: nameTranslation.data.data.translations[0].translatedText,
                    description: descriptionTranslation.data.data.translations[0].translatedText,
                    friendlyUrl: nameTranslation.data.data.translations[0].translatedText,
                    keyWords: nameTranslation.data.data.translations[0].translatedText,
                    highlights: nameTranslation.data.data.translations[0].translatedText,
                    metaDescription: nameTranslation.data.data.translations[0].translatedText,
                    title: nameTranslation.data.data.translations[0].translatedText,
                };
            })
        );

        setProduct({
            ...data,
            descriptions: translations,
        });
    };

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
                    <Grid xs={sx ? 12 : 4} p={1} sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
                        <FormControl
                            fullWidth
                            size="small"
                            error={formik.errors.manufacturer && formik.touched.manufacturer}
                        >
                            <InputLabel shrink error={formik.errors.manufacturer && formik.touched.manufacturer}>
                                {string?.brand}
                            </InputLabel>
                            <Select
                                value={data?.manufacturer || ''}
                                onChange={e => {
                                    setProduct({ ...data, manufacturer: e.target.value });
                                }}
                                label={string?.brand}
                                input={
                                    <OutlinedInput
                                        notched
                                        label={string?.brand}
                                        error={formik.errors.manufacturer && formik.touched.manufacturer}
                                    />
                                }
                            >
                                {!brandsList?.length && <MenuItem>{string?.create_a_brand}</MenuItem>}
                                {(brandsList as any[])?.map(el => {
                                    return (
                                        <MenuItem key={el.id} value={el.code}>
                                            {el.code}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>{string?.[formik.errors.manufacturer]}</FormHelperText>
                        </FormControl>
                        <Button
                            variant="contained"
                            sx={{ borderRadius: '50%', minWidth: 38, height: 38, p: 0 }}
                            onClick={() => navigate(`/store-inventory/${storeCode}/brands/create`)}
                        >
                            <AddIcon />
                        </Button>
                    </Grid>

                    <Grid xs={sx ? 6 : 4} p={1}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            type="number"
                            value={data?.price.replaceAll(',', '')}
                            error={formik.errors.price && formik.touched.price}
                            helperText={string?.[formik.errors.price]}
                            onChange={e => {
                                setProduct({ ...data, price: e.target.value });
                            }}
                            size="small"
                            label={string?.price}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {getCurrencySymbol(storeData?.currency)}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid xs={sx ? 6 : 4} p={1}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            type="number"
                            value={data?.sortOrder}
                            error={formik.errors.sortOrder && formik.touched.sortOrder}
                            helperText={string?.[formik.errors.sortOrder]}
                            onChange={e => {
                                setProduct({ ...data, sortOrder: e.target.value });
                            }}
                            size="small"
                            label={string?.order_priority}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                {TranslatedMode && (
                    <Grid xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            sx={{ ml: 'auto' }}
                            onClick={() => {
                                handleTranslate();
                            }}
                        >
                            Translate
                        </Button>
                    </Grid>
                )}
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="lang-radio-groupe"
                        name="lang-group"
                        value={rootLanguage}
                        onChange={e => {
                            const selectedName = data?.descriptions?.find(
                                description => description.language === e.target.value
                            )?.name;
                            const selectedDescription = data?.descriptions?.find(
                                description => description.language === e.target.value
                            )?.description;
                            setRootLanguage(e.target.value || '');
                            setRootName(selectedName || '');
                            setRootDescription(selectedDescription || '');
                        }}
                    >
                        {data?.descriptions &&
                            data?.descriptions?.map(({ language, name, description }, idx) => (
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
                                        border: '1px solid',

                                        borderColor:
                                            formik?.errors.descriptions &&
                                            formik.touched.descriptions &&
                                            formik.errors.descriptions[idx]?.name &&
                                            formik.touched.descriptions[idx]?.name
                                                ? '#d32f2f'
                                                : '#ccc',
                                    }}
                                >
                                    <Grid
                                        xs={12}
                                        mb={-1}
                                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                    >
                                        <Typography variant="h3">{language?.toUpperCase()}</Typography>
                                        <FormControlLabel
                                            value={language}
                                            control={<Radio size="small" />}
                                            label="ROOT"
                                        />
                                    </Grid>
                                    <Grid xs={12}>
                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            value={name}
                                            onChange={e => {
                                                setProduct({
                                                    ...data,
                                                    descriptions: data.descriptions?.map(el => {
                                                        if (el.language === language) {
                                                            return {
                                                                ...el,
                                                                name: e.target.value,
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
                                    <Grid xs={12}>
                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            value={description}
                                            onChange={e => {
                                                setProduct({
                                                    ...data,
                                                    descriptions: data.descriptions?.map(el => {
                                                        if (el.language === language) {
                                                            return {
                                                                ...el,
                                                                description: e.target.value,
                                                            };
                                                        }
                                                        return { ...el };
                                                    }),
                                                });
                                            }}
                                            size="small"
                                            label={string?.description}
                                            fullWidth
                                            multiline
                                            minRows={1}
                                            error={
                                                formik?.errors.descriptions && formik.touched.descriptions
                                                    ? formik.errors.descriptions[idx]?.description &&
                                                      formik.touched.descriptions[idx]?.description
                                                    : false
                                            }
                                            helperText={
                                                formik?.errors.descriptions
                                                    ? string?.[formik.errors.descriptions[idx]?.description]
                                                    : ''
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            ))}
                    </RadioGroup>
                </FormControl>
            </Box>
        </>
    );
};

export default ProductGeneral;
