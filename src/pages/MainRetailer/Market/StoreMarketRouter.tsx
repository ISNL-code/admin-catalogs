import { Routes, Route, Navigate } from 'react-router-dom';
import StoreMarket from './StoreMarket';

const StoreMarketRouter = () => {
    return (
        <Routes>
            <Route element={<StoreMarket />}>
                <Route path={'/*'} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    ) as any;
};

export default StoreMarketRouter;
