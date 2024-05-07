import { Box, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { debounce } from 'lodash';
import { Colors } from 'colors';

interface ImageProps {
    width: number;
    height: number;
    imgUrl: string;
    maxWidth?: string;
    isDrag?: boolean;
    isRemovable?: boolean;
    deleteAction?: () => void;
}

const Image: React.FC<ImageProps> = memo(
    ({ width, height, imgUrl, maxWidth = '100%', isDrag = false, isRemovable = false, deleteAction = () => {} }) => {
        const [imgHeight, setImgHeight] = useState<number>(0);
        const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false); // State to track image loading
        const ref = useRef<HTMLDivElement>(null);
        const imageLoader = useRef<HTMLImageElement>(document.createElement('img'));

        const updateImageSize = useCallback(() => {
            if (ref.current) {
                const newHeight = (ref.current.clientWidth / width) * height;
                setImgHeight(newHeight);
            }
        }, [width, height]);

        useEffect(() => {
            updateImageSize(); // Initial setup without delay
            const debouncedResize = debounce(updateImageSize, 250);

            window.addEventListener('resize', debouncedResize);
            return () => window.removeEventListener('resize', debouncedResize);
        }, [updateImageSize]);

        useEffect(() => {
            const image = imageLoader.current;
            image.src = imgUrl;
            image.onload = () => setIsImageLoaded(true);
            image.onerror = () => setIsImageLoaded(true); // Handle error case
        }, [imgUrl]); // eslint-disable-line

        const stableDeleteAction = useCallback(deleteAction, []); // eslint-disable-line

        return (
            <Box
                ref={ref}
                sx={{
                    width: '100%',
                    height: imgHeight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    cursor: isDrag ? 'grab' : undefined,
                    maxWidth,
                    position: 'relative',
                    backgroundColor: isImageLoaded ? undefined : 'transparent',
                }}
            >
                {isImageLoaded && ( // Render image only when loaded
                    <>
                        {isRemovable && (
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 4,
                                    background: Colors?.WHITE,
                                    border: '2px solid',
                                    borderColor: Colors?.GRAY,
                                    '&:hover': { background: Colors?.GRAY_300 },
                                    width: 26,
                                    height: 26,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onClick={stableDeleteAction}
                            >
                                <CloseIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        )}

                        <img src={imgUrl} style={{ width: '100%', height: 'auto' }} alt="displayed" />
                    </>
                )}

                {!isImageLoaded && ( // Render loading indicator while image is loading
                    <CircularProgress
                        sx={{
                            position: 'absolute',
                            color: Colors?.GRAY,
                        }}
                    />
                )}
            </Box>
        );
    }
);

export default Image;
