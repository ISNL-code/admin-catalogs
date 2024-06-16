import { Box, IconButton, CircularProgress, Typography } from '@mui/material';
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
    showImageFormat?: boolean;
}

const Image: React.FC<ImageProps> = memo(
    ({
        width,
        height,
        imgUrl,
        maxWidth = '300px',
        isDrag = false,
        isRemovable = false,
        deleteAction = () => {},
        showImageFormat = false,
    }) => {
        const [imgHeight, setImgHeight] = useState<number>(0);
        const ref = useRef<HTMLDivElement>(null);
        const [imgLoaded, setImgLoaded] = useState(false);

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

        const stableDeleteAction = useCallback(deleteAction, []); // eslint-disable-line

        const isWebp = imgUrl?.endsWith('.webp');

        return (
            <Box
                ref={ref}
                sx={{
                    width: '100%',
                    maxWidth: maxWidth,
                    height: imgHeight || '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    cursor: isDrag ? 'grab' : undefined,
                    position: 'relative',
                }}
            >
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
                            zIndex: 1000,
                        }}
                        onClick={stableDeleteAction}
                    >
                        <CloseIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                )}

                {isWebp && showImageFormat && (
                    <Typography
                        sx={{
                            position: 'absolute',
                            top: 4,
                            left: 4,
                            fontSize: 10,
                            backgroundColor: 'white',
                            px: 0.2,
                            zIndex: 1000,
                        }}
                    >
                        webp
                    </Typography>
                )}
                <div style={{ height: '100%', position: 'relative', width: '100%' }}>
                    <img
                        src={imgUrl}
                        style={{
                            width: '100%',
                            opacity: imgLoaded ? 1 : 0,
                        }}
                        alt="Loading..."
                        onLoad={event => {
                            setImgLoaded(!event?.bubbles);
                        }}
                    />
                    <div style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', position: 'absolute' }}>
                        <CircularProgress
                            sx={{
                                color: Colors?.GRAY,
                                opacity: imgLoaded ? 0 : 1,
                            }}
                            thickness={1}
                        />
                    </div>
                </div>
            </Box>
        );
    }
);

export default Image;
