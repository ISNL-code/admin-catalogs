import { Box, Button, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import imageCompression from 'browser-image-compression';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Loader from '../Loader/Loader';

interface ImageInterface {
    width: number;
    height: number;
    title: string;
    maxWidth?: string;
    addAction?;
}

const EmptyImageInput = ({ width = 1, height = 1, title, maxWidth = '100%', addAction = () => {} }: ImageInterface) => {
    const { string }: any = useOutletContext();
    const { xxs, xs, s, sm, sx, slx, m, mx, ls, l } = useDevice();
    const [imgHeight, setImgHeight] = useState<number>(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const [loading, setLoading] = useState(true);

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setImgHeight(ref?.current?.clientWidth ? (ref?.current?.clientWidth / width) * height : 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.addEventListener('orientationchange', event => {
            const w = event.target as Window;
            setScreenWidth(w.innerWidth);
        });
        window.addEventListener('resize', (event: UIEvent) => {
            const w = event.target as Window;
            setScreenWidth(w.innerWidth);
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        window.innerWidth,

        xxs,
        xs,
        s,
        sm,
        sx,
        slx,
        m,
        mx,
        ls,
        l,
        ref?.current?.clientWidth,
        ref?.current?.clientHeight,
    ]);

    useEffect(() => {
        setTimeout(() => {
            setImgHeight(ref?.current?.clientWidth ? (ref?.current?.clientWidth / width) * height : 0);
            setLoading(false);
        }, 250); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenWidth, loading, xxs, xs, s, sm, sx, slx, m, mx, ls, l]);

    return (
        <>
            {loading && <Loader />}
            <Dropzone
                noClick
                onDrop={(acceptedFiles: any) => {
                    if (
                        ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(
                            acceptedFiles[0].type
                        )
                    ) {
                        async function handleImageUpload() {
                            const imageFile = acceptedFiles[0];
                            const options = {
                                maxSizeMB: 0.075,
                            };
                            try {
                                const compressedFile = await imageCompression(imageFile, options);
                                addAction(compressedFile);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        handleImageUpload();
                    } else {
                        toast.error(string?.wrong_file_format);
                    }
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <Button variant="text" component="label" sx={{ width: '100%', height: '100%' }}>
                        <Box
                            {...getRootProps()}
                            ref={ref}
                            sx={{
                                width: '100%',
                                height: imgHeight,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                maxWidth: maxWidth,
                                backgroundColor: '#ffffff',
                            }}
                        >
                            <input
                                {...getInputProps()}
                                hidden
                                style={{ width: '100%', height: '100%' }}
                                accept="image/*"
                                multiple
                                type="file"
                                onChange={(event: any) => {
                                    if (
                                        ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(
                                            event.target.files[0]?.type
                                        )
                                    ) {
                                        async function handleImageUpload() {
                                            setLoading(true);
                                            const imageFile = event.target.files[0];
                                            const options = {
                                                maxSizeMB: 0.075,
                                            };
                                            try {
                                                const compressedFile = await imageCompression(imageFile, options);
                                                addAction(imageFile).finally(() => setLoading(false));
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }
                                        handleImageUpload();
                                    } else {
                                        toast.error(string?.wrong_file_format);
                                    }
                                }}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                }}
                            >
                                <Typography>{title}</Typography>
                                <AddPhotoAlternateIcon fontSize="large" sx={{ my: 0.5 }} />
                                <Typography>Formats:</Typography>
                                <Typography sx={{ fontSize: 12, textTransform: 'lowercase' }}>
                                    .jpg .jpeg .png .webp .avif
                                </Typography>
                            </Box>
                        </Box>
                    </Button>
                )}
            </Dropzone>
        </>
    );
};

export default EmptyImageInput;
