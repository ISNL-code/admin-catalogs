import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import imageCompression from 'browser-image-compression';
import Image from 'components/atoms/Media/Image';
import toast from 'react-hot-toast';
import { EditDataStore } from 'types';
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
    UseMutateAsyncFunction,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';

interface OptionsPageInterface {
    data: EditDataStore;
    refreshStoreData: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<AxiosResponse<any, any>, unknown>>;
    uploadLogo: UseMutateAsyncFunction<AxiosResponse<any, any>, unknown, any, unknown>;
    handleSetTitle;
    handleSetActionButtons;
}

const OptionsInformation = ({
    data,
    refreshStoreData,
    uploadLogo,
    handleSetTitle,
    handleSetActionButtons,
}: OptionsPageInterface) => {
    const { sx } = useDevice();
    const { string }: any = useOutletContext();

    useEffect(() => {
        handleSetTitle(string?.options);
    }, []);

    useEffect(() => {
        handleSetActionButtons([{ name: 'save', disabled: true, action: () => {} }]);
    }, []);

    return (
        <>
            <Grid container xs={12} sx={{ border: '1px solid #ccc', p: 1 }}>
                <Grid xs={sx ? 12 : 6} sx={{ p: 1, position: 'relative' }}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            border: '1px solid #ccc',
                            borderRadius: 1,
                        }}
                    >
                        <Typography sx={{ position: 'absolute', top: 15, left: 20, color: 'gray' }}>
                            {string?.logo}
                        </Typography>
                        <Box sx={{ minHeight: '300px', opacity: data.logo?.path ? 1 : 0 }}>
                            <Box
                                sx={{
                                    minWidth: '160px',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                }}
                            >
                                <Image width={1} height={1} imgUrl={data.logo?.path as any} maxWidth="200px" />
                            </Box>
                        </Box>

                        <Button
                            variant="text"
                            component="label"
                            sx={{
                                padding: 0,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                                opacity: data.logo?.path ? 0 : 1,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 245,
                                    height: 245,
                                    borderRadius: '50%',
                                    border: '4px dotted #ccc',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#fff',
                                }}
                            >
                                {string?.download_logo}
                            </Box>

                            <input
                                disabled
                                hidden
                                accept="image/*, video/*"
                                multiple
                                type="file"
                                onChange={(event: any) => {
                                    async function handleImageUpload() {
                                        const imageFile = event.target.files[0];

                                        const options = {
                                            maxSizeMB: 0.1,
                                            maxWidthOrHeight: 1920,
                                        };
                                        try {
                                            const compressedFile = await imageCompression(imageFile, options);
                                            uploadLogo({ storeCode: data.code, img: compressedFile }).then(() => {
                                                refreshStoreData();
                                            });
                                        } catch (err) {
                                            console.log(err);
                                            toast.error('Error');
                                        }
                                    }
                                    handleImageUpload();
                                }}
                            />
                        </Button>
                    </Box>
                </Grid>
                <Grid xs={sx ? 12 : 6} sx={{ p: 1, position: 'relative' }}>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            border: '1px solid #ccc',
                            borderRadius: 1,
                        }}
                    >
                        <Typography sx={{ position: 'absolute', top: 15, left: 20, color: 'gray' }}>
                            {string?.store_image}
                        </Typography>

                        <Box sx={{ minHeight: '300px', opacity: data.image ? 1 : 0 }}>
                            <Box
                                sx={{
                                    minWidth: '245px',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%,-50%)',
                                }}
                            >
                                <Image width={1} height={1} imgUrl="" maxWidth="200px" />
                            </Box>
                        </Box>

                        <Button
                            variant="text"
                            component="label"
                            sx={{
                                padding: 0,
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%,-50%)',
                                opacity: data.image ? 0 : 1,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 245,
                                    height: 245,
                                    borderRadius: '50%',
                                    border: '4px dotted #ccc',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#fff',
                                }}
                            >
                                {string?.download_image}
                            </Box>

                            <input
                                disabled
                                hidden
                                accept="image/*, video/*"
                                multiple
                                type="file"
                                onChange={event => {}}
                            />
                        </Button>
                    </Box>
                </Grid>
                <Grid xs={12} sx={{ px: 1, mt: 3 }}>
                    <Typography variant="h3">{string?.product_image_settings}</Typography>
                </Grid>
                <Grid xs={sx ? 12 : 3} sx={{ p: 1, py: 1.25 }}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={''}
                        onChange={e => {}}
                        size="small"
                        label={string?.width}
                        fullWidth
                    />
                </Grid>
                <Grid xs={sx ? 12 : 3} sx={{ p: 1, py: 1.25 }}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={''}
                        onChange={e => {}}
                        size="small"
                        label={string?.height}
                        fullWidth
                    />
                </Grid>
                <Grid xs={sx ? 12 : 3} sx={{ p: 1, py: 1.25 }}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={''}
                        onChange={e => {}}
                        size="small"
                        label={string?.crop_width}
                        fullWidth
                    />
                </Grid>
                <Grid xs={sx ? 12 : 3} sx={{ p: 1, py: 1.25 }}>
                    <TextField
                        disabled
                        InputLabelProps={{ shrink: true }}
                        value={''}
                        onChange={e => {}}
                        size="small"
                        label={string?.crop_height}
                        fullWidth
                    />
                </Grid>
                <Grid xs={12} sx={{ px: 1, mt: 3 }}>
                    <Typography variant="h3">{string?.functions_settings}</Typography>
                </Grid>
                <Grid container xs={sx ? 12 : 6}>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel control={<Checkbox defaultChecked disabled />} label={string?.cart} />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel control={<Checkbox defaultChecked disabled />} label={string?.favorites} />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel control={<Checkbox defaultChecked disabled />} label={string?.contacts} />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel control={<Checkbox defaultChecked disabled />} label={string?.filter} />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked disabled />}
                            label={string?.share_product_link}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={sx ? 12 : 6}>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked disabled />}
                            label={string?.search_by_sku}
                        />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel control={<Checkbox defaultChecked disabled />} label={string?.prices} />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel control={<Checkbox defaultChecked disabled />} label={string?.sizes} />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel control={<Checkbox defaultChecked disabled />} label={string?.colors} />
                    </Grid>
                    <Grid xs={12} sx={{ px: 1 }}>
                        <FormControlLabel control={<Checkbox defaultChecked disabled />} label={string?.promo} />
                    </Grid>
                </Grid>

                <Grid xs={12} sx={{ px: 1, mt: 3 }}>
                    <Typography variant="h3">{string?.store_security}</Typography>
                </Grid>
                <Grid container xs={sx ? 12 : 6}>
                    <Grid xs={sx ? 12 : 4} sx={{ p: 1, py: 1.25 }}>
                        <FormControlLabel disabled control={<Checkbox />} label={string?.private_store} />
                    </Grid>
                    <Grid xs={sx ? 12 : 8} sx={{ p: 1, py: 1.25 }}>
                        <TextField
                            disabled
                            InputLabelProps={{ shrink: true }}
                            value={''}
                            onChange={e => {}}
                            size="small"
                            label={string?.store_key}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid xs={12} sx={{ px: 1, mt: 3 }}>
                    <Typography variant="h3">{string?.product_settings}</Typography>
                </Grid>
                <Grid xs={sx ? 12 : 6} sx={{ p: 1, py: 1.25 }}>
                    <FormControl disabled fullWidth size="small">
                        <InputLabel>{string?.product_types}</InputLabel>
                        <Select value={''} label={string?.product_types + '*'} onChange={e => {}}>
                            {[].map(el => (
                                <MenuItem key={el} value={el}>
                                    {el}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
};

export default OptionsInformation;
