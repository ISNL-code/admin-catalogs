import {
    Box,
    Button,
    Checkbox,
    Chip,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'components/atoms/Media/Image';
import { EditDataStore } from 'types';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
    UseMutateAsyncFunction,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { PRODUCT_TYPES } from 'dataBase/PRODUCT_TYPES';
import EmptyImageInput from 'components/atoms/Media/EmptyImageInput';

interface OptionsPageInterface {
    data: EditDataStore;
    refreshStoreData: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
    uploadLogo: UseMutateAsyncFunction<AxiosResponse<any, any>, unknown, any, unknown>;
    handleSetTitle;
    handleSetActionButtons;
    handleChangeStoreData;
}

const Options = ({
    data,
    refreshStoreData,
    uploadLogo,
    handleSetTitle,
    handleSetActionButtons,
    handleChangeStoreData,
}: OptionsPageInterface) => {
    const { sx, s } = useDevice();
    const { string }: any = useOutletContext();

    useEffect(() => {
        handleSetTitle(string?.options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        handleSetActionButtons([{ name: 'save', action: () => {} }]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!data?.mainStoreSettings || !data?.additionalStoreSettings || !data?.dataBaseStoreSettings) return <></>;

    return (
        <>
            <Grid container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
                <Grid xs={sx ? 12 : 6} sx={{ p: 1 }}>
                    <Typography variant="h3"> {string?.logo}</Typography>
                    <Box
                        sx={{
                            border: '1px solid #ccc',
                            height: '400px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        {data?.logo?.path ? (
                            <>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        zIndex: 1,
                                        width: 100,
                                        height: 30,
                                        backgroundColor: 'white',
                                        '&:hover': { backgroundColor: 'white' },
                                    }}
                                >
                                    <Box>
                                        {string?.replace}
                                        <Box sx={{ visibility: 'hidden', width: 0, height: 0 }}>
                                            <EmptyImageInput
                                                width={1}
                                                height={1}
                                                title=""
                                                addAction={val => {
                                                    uploadLogo({ storeCode: data?.code, img: val }).then(() => {
                                                        refreshStoreData();
                                                    });
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Button>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Image
                                        width={1}
                                        height={1}
                                        imgUrl={data?.logo?.path as any}
                                        maxWidth={s ? '75%' : '40%'}
                                    />
                                </Box>
                            </>
                        ) : (
                            <EmptyImageInput
                                width={1}
                                height={1}
                                title=""
                                addAction={val => {
                                    uploadLogo({ storeCode: data?.code, img: val }).then(() => {
                                        refreshStoreData();
                                    });
                                }}
                            />
                        )}
                    </Box>
                </Grid>
                <Grid xs={sx ? 12 : 6} sx={{ p: 1 }}>
                    <Typography variant="h3"> {string?.store_image} (Feature)</Typography>
                    <Box
                        sx={{
                            border: '1px solid #ccc',
                            height: '400px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        {data?.mainImage ? (
                            <>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    sx={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        zIndex: 1,
                                        width: 100,
                                        height: 30,
                                        backgroundColor: 'white',
                                        '&:hover': { backgroundColor: 'white' },
                                    }}
                                >
                                    <Box>
                                        {string?.replace}
                                        <Box sx={{ visibility: 'hidden', width: 0, height: 0 }}>
                                            <EmptyImageInput width={4} height={3} title="" />
                                        </Box>
                                    </Box>
                                </Button>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Image
                                        width={1}
                                        height={1}
                                        imgUrl={data?.mainImage as any}
                                        maxWidth={s ? '75%' : '40%'}
                                    />
                                </Box>
                            </>
                        ) : (
                            <EmptyImageInput width={1} height={1} title="" />
                        )}
                    </Box>
                </Grid>
                <Grid xs={12} sx={{ px: 1, mt: 3 }}>
                    <Typography variant="h3">{string?.product_image_settings}</Typography>
                </Grid>
                <Grid xs={sx ? 12 : 3} sx={{ p: 1, py: 1.25 }}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        value={data?.productImagesOptions?.width || ''}
                        onChange={e => {}}
                        size="small"
                        label={string?.width}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid xs={sx ? 12 : 3} sx={{ p: 1, py: 1.25 }}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        value={data?.productImagesOptions?.height || ''}
                        onChange={e => {}}
                        size="small"
                        label={string?.height}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid xs={sx ? 12 : 3} sx={{ p: 1, py: 1.25 }}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        value={data?.productImagesOptions?.cropX || ''}
                        onChange={e => {}}
                        size="small"
                        label={string?.crop_width}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid xs={sx ? 12 : 3} sx={{ p: 1, py: 1.25 }}>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        value={data?.productImagesOptions?.cropY || ''}
                        onChange={e => {}}
                        size="small"
                        label={string?.crop_height}
                        fullWidth
                        disabled
                    />
                </Grid>
                <Grid xs={12} sx={{ px: 1, my: 1, py: 1, mb: 1, borderTop: '1px solid #ccc' }}>
                    <Typography variant="h3">{string?.functions_settings}</Typography>
                </Grid>
                <Grid container xs={sx ? 12 : 6}>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.mainStoreSettings?.skuSearch || ''} />}
                            label={string?.search_by_sku}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.mainStoreSettings?.colors || ''} />}
                            label={string?.colors}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.mainStoreSettings?.prices || ''} />}
                            label={string?.prices}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={data?.mainStoreSettings?.sizes}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            handleChangeStoreData({
                                                ...data,
                                                mainStoreSettings: {
                                                    ...data.mainStoreSettings,
                                                    sizes: true,
                                                },
                                            });
                                        } else {
                                            handleChangeStoreData({
                                                ...data,
                                                mainStoreSettings: {
                                                    ...data.mainStoreSettings,
                                                    sizes: false,
                                                },
                                            });
                                        }
                                    }}
                                />
                            }
                            label={string?.sizes}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.mainStoreSettings?.contacts} />}
                            label={string?.contacts}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.mainStoreSettings?.categories} />}
                            label={string?.categories}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.mainStoreSettings?.browserSearch} />}
                            label={string?.available_in_browser}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.mainStoreSettings?.productShare} />}
                            label={string?.share_product_link}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.mainStoreSettings?.platformAvailable} />}
                            label={string?.show_in_market}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid container xs={sx ? 12 : 6}>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.additionalStoreSettings?.cart} />}
                            label={string?.cart}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.additionalStoreSettings?.favorites} />}
                            label={string?.favorites}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.additionalStoreSettings?.promo} />}
                            label={string?.promo}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.additionalStoreSettings?.video} />}
                            label={string?.video}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.additionalStoreSettings?.tableSizes} />}
                            label={string?.size_table}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.additionalStoreSettings?.callback} />}
                            label={string?.call_back}
                            disabled
                        />
                    </Grid>

                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.additionalStoreSettings?.appleStore} />}
                            label={'Apple Store'}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.additionalStoreSettings?.playMarket} />}
                            label={'Play Market'}
                            disabled
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.additionalStoreSettings?.analytics} />}
                            label={string?.analytics}
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} sx={{ alignItems: 'center', borderTop: '1px solid #ccc' }}>
                    <Grid p={1} xs={sx ? 12 : 'auto'}>
                        <Typography variant="h4" sx={{ width: 140 }}>
                            {string?.users}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="users-radio-group"
                                name="row-radio-buttons-group"
                                value={data?.dataBaseStoreSettings?.users}
                                onChange={() => {}}
                            >
                                <FormControlLabel value="2" control={<Radio disabled />} label="2" />
                                <FormControlLabel value="5" control={<Radio disabled />} label="5" />
                                <FormControlLabel value="10" control={<Radio disabled />} label="10" />
                                <FormControlLabel
                                    value={'unlimited'}
                                    control={<Radio disabled />}
                                    label={string?.unlimited}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container xs={12} sx={{ alignItems: 'center', borderTop: '1px solid #ccc' }}>
                    <Grid p={1} xs={sx ? 12 : 'auto'}>
                        <Typography variant="h4" sx={{ width: 140 }}>
                            {string?.products}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="users-radio-group"
                                name="row-radio-buttons-group"
                                value={data?.dataBaseStoreSettings?.products}
                                onChange={() => {}}
                            >
                                <FormControlLabel value="50" control={<Radio disabled />} label="50" />
                                <FormControlLabel value="200" control={<Radio disabled />} label="200" />
                                <FormControlLabel value="500" control={<Radio disabled />} label="500" />
                                <FormControlLabel
                                    value={'unlimited'}
                                    control={<Radio disabled />}
                                    label={string?.unlimited}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container xs={12} sx={{ alignItems: 'center', borderTop: '1px solid #ccc' }}>
                    <Grid p={1} xs={sx ? 12 : 'auto'}>
                        <Typography variant="h4" sx={{ width: 140 }}>
                            {string?.models}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="users-radio-group"
                                name="row-radio-buttons-group"
                                value={data?.dataBaseStoreSettings?.productModels}
                                onChange={() => {}}
                            >
                                <FormControlLabel value="5" control={<Radio disabled />} label="5" />
                                <FormControlLabel value="10" control={<Radio disabled />} label="10" />
                                <FormControlLabel value="15" control={<Radio disabled />} label="15" />
                                <FormControlLabel
                                    value={'unlimited'}
                                    control={<Radio disabled />}
                                    label={string?.unlimited}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container xs={12} sx={{ alignItems: 'center', borderTop: '1px solid #ccc' }}>
                    <Grid p={1} xs={sx ? 12 : 'auto'}>
                        <Typography variant="h4" sx={{ width: 140 }}>
                            {string?.photo}
                        </Typography>
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="users-radio-group"
                                name="row-radio-buttons-group"
                                value={data?.dataBaseStoreSettings?.photos}
                                onChange={() => {}}
                            >
                                <FormControlLabel value="5" control={<Radio disabled />} label="5" />
                                <FormControlLabel value="10" control={<Radio disabled />} label="10" />
                                <FormControlLabel value="15" control={<Radio disabled />} label="15" />
                                <FormControlLabel
                                    value={'unlimited'}
                                    control={<Radio disabled />}
                                    label={string?.unlimited}
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                {data?.additionalStoreSettings?.video && (
                    <Grid
                        container
                        xs={12}
                        sx={{ alignItems: 'center', borderTop: '1px solid #ccc', borderBottom: '1px solid #ccc' }}
                    >
                        <Grid p={1} xs={sx ? 12 : 'auto'}>
                            <Typography variant="h4" sx={{ width: 140 }}>
                                {string?.video}
                            </Typography>
                        </Grid>
                        <Grid xs={12} sx={{ px: 1 }}>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="users-radio-group"
                                    name="row-radio-buttons-group"
                                    value={data?.dataBaseStoreSettings?.videos}
                                    onChange={() => {}}
                                >
                                    <FormControlLabel value="1" control={<Radio disabled />} label="1" />
                                    <FormControlLabel value="3" control={<Radio disabled />} label="3" />
                                    <FormControlLabel value="5" control={<Radio disabled />} label="5" />
                                    <FormControlLabel
                                        value={'unlimited'}
                                        control={<Radio disabled />}
                                        label={string?.unlimited}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                )}

                <Grid xs={12} sx={{ px: 1, mt: 3 }}>
                    <Typography variant="h3">{string?.store_security}</Typography>
                </Grid>
                <Grid container xs={sx ? 12 : 6}>
                    <Grid xs={sx ? 12 : 4} sx={{ p: 1 }}>
                        <FormControlLabel
                            control={<Checkbox checked={data?.securityStoreSettings?.private} />}
                            label={string?.private_store}
                            disabled
                        />
                    </Grid>
                    <Grid xs={sx ? 12 : 8} sx={{ p: 1 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data?.securityStoreSettings?.securityKey || ''}
                            onChange={e => {}}
                            size="small"
                            label={string?.store_key}
                            fullWidth
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid pt={1} xs={12} sx={{ px: 1, mt: 3, borderTop: '1px solid #ccc' }}>
                    <Typography variant="h3">WEB URL</Typography>
                </Grid>

                <Grid container xs={sx ? 12 : 6}>
                    <Grid xs={sx ? 12 : 8} sx={{ p: 1 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data?.webUrl || ''}
                            onChange={e => {}}
                            size="small"
                            label={'WEB URL'}
                            fullWidth
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid pt={1} xs={12} sx={{ px: 1, mt: 3, borderTop: '1px solid #ccc' }}>
                    <Typography variant="h3">AppStore URL</Typography>
                </Grid>
                <Grid container xs={sx ? 12 : 6}>
                    <Grid xs={sx ? 12 : 8} sx={{ p: 1 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data?.appStoreUrl || ''}
                            onChange={e => {}}
                            size="small"
                            label={'WEB URL'}
                            fullWidth
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid pt={1} xs={12} sx={{ px: 1, mt: 3, borderTop: '1px solid #ccc' }}>
                    <Typography variant="h3">PlayMarket URL</Typography>
                </Grid>
                <Grid container xs={sx ? 12 : 6}>
                    <Grid xs={sx ? 12 : 8} sx={{ p: 1 }}>
                        <TextField
                            InputLabelProps={{ shrink: true }}
                            value={data?.playMarketUrl || ''}
                            onChange={e => {}}
                            size="small"
                            label={'WEB URL'}
                            fullWidth
                            disabled
                        />
                    </Grid>
                </Grid>
                <Grid pt={1} xs={12} sx={{ px: 1, mt: 3, borderTop: '1px solid #ccc' }}>
                    <Typography variant="h3">{string?.product_settings}</Typography>
                </Grid>
                <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                    <FormControl fullWidth size="small" disabled>
                        <InputLabel>{string?.product_types}</InputLabel>
                        <Select
                            size="small"
                            value={data?.storeProductTypes?.map(el => el.code) || []}
                            label={string?.product_types + '*'}
                            onChange={e => {}}
                            multiple
                            input={<OutlinedInput size="small" label={string?.product_types + '*'} />}
                            renderValue={selected => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected?.map(value => (
                                        <Chip size="small" key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {PRODUCT_TYPES?.map((el, idx) => (
                                <MenuItem key={idx} value={el.code}>
                                    {el.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
};

export default Options;
