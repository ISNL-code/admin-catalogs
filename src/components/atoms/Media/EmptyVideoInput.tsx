import { Box, Button, Typography } from '@mui/material';
import { useDevice } from 'hooks/useDevice';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';
import Dropzone from 'react-dropzone';

interface VideoInterface {
    width: number;
    height: number;
    title: string;
    maxWidth?: string;
    addAction?;
}

const EmptyVideoInput = ({ width = 1, height = 1, title, maxWidth = '100%', addAction = () => {} }: VideoInterface) => {
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
        <Dropzone
            noClick
            onDrop={(acceptedFiles: any) => {
                if (['video/mp4'].includes(acceptedFiles[0].type)) {
                    if (acceptedFiles[0]?.size > 9979703) return toast.error(string?.file_more_then_ten_mbd);
                    addAction(acceptedFiles[0]);
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
                            accept="image/mp4"
                            multiple
                            type="file"
                            onChange={(event: any) => {
                                if (['video/mp4'].includes(event.target.files[0].type)) {
                                    if (event?.target?.files[0]?.size > 9979703)
                                        return toast.error(string?.file_more_then_ten_mbd);
                                    addAction(event?.target?.files[0]);
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
                            <QueuePlayNextIcon sx={{ my: 0.5 }} fontSize="large" />
                            <Typography>Max Size:</Typography>
                            <Typography sx={{ textTransform: 'lowercase', fontSize: 12 }}>10MB</Typography>
                        </Box>
                    </Box>
                </Button>
            )}
        </Dropzone>
    );
};

export default EmptyVideoInput;
