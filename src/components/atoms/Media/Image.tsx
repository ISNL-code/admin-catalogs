import { Box } from '@mui/material';
import { useDevice } from 'hooks/useDevice';

import { useEffect, useRef, useState } from 'react';

interface ImageInterface {
    width: number;
    height: number;
    imgUrl: string;
    maxWidth?: string;
}

const Image = ({ width = 1, height = 1, imgUrl, maxWidth = '100%' }: ImageInterface) => {
    const { xxs, xs, s, sm, sx, slx, m, mx, ls, l } = useDevice();
    const [imgHeight, setImgHeight] = useState<number>(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const [loading, setLoading] = useState(true);

    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setImgHeight(ref?.current?.clientWidth ? (ref?.current?.clientWidth / width) * height : 0);
    }, []);

    useEffect(() => {
        window.addEventListener('orientationchange', event => {
            const w = event.target as Window;
            setScreenWidth(w.innerWidth);
        });
        window.addEventListener('resize', (event: UIEvent) => {
            const w = event.target as Window;
            setScreenWidth(w.innerWidth);
        });
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
        }, 250);
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
                cursor: 'pointer',
                maxWidth: maxWidth,
            }}
        >
            <img src={imgUrl} style={{ width: '100%' }} alt="img" />
        </Box>
    );
};

export default Image;
