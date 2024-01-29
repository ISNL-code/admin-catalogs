import { Box, IconButton } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';

import { useEffect, useRef, useState } from 'react';

interface ImageInterface {
    width: number;
    height: number;
    imgUrl: string;
    maxWidth?: string;
    isRemovable?: boolean;
    deleteAction?;
}

const Video = ({
    width = 1,
    height = 1,
    imgUrl,
    maxWidth = '100%',
    isRemovable = false,
    deleteAction = () => {},
}: ImageInterface) => {
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
        <Box
            ref={ref}
            sx={{
                width: '100%',
                height: imgHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                maxWidth: maxWidth,
                position: 'relative',
            }}
        >
            {isRemovable && (
                <IconButton
                    sx={{ position: 'absolute', top: 1, right: 1, cursor: 'default', zIndex: 1000 }}
                    onClick={deleteAction}
                >
                    <CancelPresentationIcon />
                </IconButton>
            )}
            <video src={imgUrl} style={{ width: '100%' }} controls />
        </Box>
    );
};

export default Video;
