import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} size={90} thickness={3} sx={{ color: '#757575' }} />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function LoaderProgress() {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prevProgress => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 100,
                flexDirection: 'column',
            }}
        >
            <CircularProgressWithLabel value={progress} />;
        </Box>
    );
}
