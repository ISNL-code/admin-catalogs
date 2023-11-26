import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useDevice = () => {
    const [currentDevice, setCurrentDevice] = useState(Number(null));
    const xxxxs = useMediaQuery({ query: '(max-width: 350px)' });
    const xxxs = useMediaQuery({ query: '(max-width: 375px)' });
    const xxs = useMediaQuery({ query: '(max-width: 425px)' });
    const xs = useMediaQuery({ query: '(max-width: 475px)' });
    const s = useMediaQuery({ query: '(max-width: 500px)' });
    const sm = useMediaQuery({ query: '(max-width: 600px)' });
    const slx = useMediaQuery({ query: '(max-width: 700px)' });
    const sx = useMediaQuery({ query: '(max-width: 769px)' });
    const m = useMediaQuery({ query: '(max-width: 900px)' });
    const mx = useMediaQuery({ query: '(max-width: 1080px)' });
    const ls = useMediaQuery({ query: '(max-width: 1240px)' });
    const l = useMediaQuery({ query: '(max-width: 1480px)' });
    const lx = useMediaQuery({ query: '(max-width:2000px)' });
    const lxx = useMediaQuery({ query: '(max-width:3200px)' });
    const lxxx = useMediaQuery({ query: '(max-width:5600px)' });

    useEffect(() => {
        setCurrentDevice(window.innerWidth);
    }, [window.innerWidth]);

    return { xxxxs, xxxs, xxs, xs, s, sm, slx, sx, m, mx, ls, l, lx, lxx, lxxx, currentDevice };
};
