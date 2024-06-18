import { Box, Button, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import imageCompression from 'browser-image-compression';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import LoaderProgress from '../Loader/LoaderProgress';

interface ImageInterface {
    width: number;
    height: number;
    title: string;
    maxWidth?: string;
    addAction?: (file: Blob) => void;
    imageQuota: number;
    fileName?: string;
    isWebp?: boolean;
    maxSize?: number;
}

const EmptyImageInput = ({
    width = 1,
    height = 1,
    title,
    maxWidth = '100%',
    addAction = () => {},
    imageQuota,
    fileName,
    isWebp = true,
    maxSize = 0.1,
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
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: maxSize,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                });
                const webpBlob = await convertToWebP(new File([compressedFile], file.name, { type: file.type }));

                addAction(isWebp ? webpBlob : compressedFile);
            } catch (error) {
                console.error(error);
                toast.error('Error processing image.');
            }
        }
        setLoading(false);
    };

    const convertToWebP = async (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function (event) {
                if (!event.target || !event.target.result) {
                    reject(new Error('Failed to load image data'));
                    return;
                }
                const img = new Image();
                img.onload = function () {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;

                    const ctx = canvas.getContext('2d');
                    if (!ctx) {
                        reject(new Error('Failed to get canvas context'));
                        return;
                    }

                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(
                        blob => {
                            if (!blob) {
                                reject(new Error('Failed to convert canvas to Blob'));
                                return;
                            }
                            const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.webp', {
                                type: 'image/webp',
                            });
                            resolve(webpFile);
                        },
                        'image/webp',
                        0.9
                    );
                };

                img.onerror = () => {
                    reject(new Error('Image load error'));
                    img.src = ''; // Clear src to release memory
                };
                img.src = event.target.result.toString();
            };

            reader.onerror = () => {
                reject(new Error('FileReader error'));
                reader.abort(); // Clean up FileReader
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            {loading && <LoaderProgress />}
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
