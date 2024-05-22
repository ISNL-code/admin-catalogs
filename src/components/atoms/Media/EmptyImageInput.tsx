import { Box, Button, Typography } from '@mui/material';
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
    addAction?: (file: Blob) => void;
    imageQuota: number;
    fileName?: string;
}

const EmptyImageInput = ({
    width = 1,
    height = 1,
    title,
    maxWidth = '100%',
    addAction = () => {},
    imageQuota,
    fileName,
}: ImageInterface) => {
    const { string }: any = useOutletContext();
    const [imgHeight, setImgHeight] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const updateDimensions = () => {
        const clientWidth = ref.current?.clientWidth ?? 0;
        setImgHeight((clientWidth / width) * height);
    };

    useEffect(() => {
        updateDimensions();
        const handleResize = () => updateDimensions();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [width, height]); // eslint-disable-line

    const handleDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > imageQuota) {
            toast.error(`${string?.max_images} ${imageQuota}`);
            return;
        }

        const validTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp', 'image/avif'];
        if (!acceptedFiles.every(file => validTypes.includes(file.type))) {
            toast.error(string?.wrong_file_format);
            return;
        }

        for (const file of acceptedFiles) {
            try {
                setLoading(true);
                const compressedFile = await imageCompression(file, { maxSizeMB: 0.075 });
                addAction(compressedFile);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            {loading && <Loader />}
            <Dropzone noClick onDrop={handleDrop}>
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
                            <input {...getInputProps()} hidden accept="image/*" multiple type="file" />
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 0.5,
                                }}
                            >
                                <Typography>{title}</Typography>
                                <AddPhotoAlternateIcon fontSize="large" />
                                <Typography>
                                    Add or Drop {fileName} {imageQuota > 1 ? 'Images' : 'Image'}
                                </Typography>
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
