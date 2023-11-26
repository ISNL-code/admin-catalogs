import { Routes, Route, Navigate } from 'react-router-dom';
import StoreProfile from './StoreProfile';

const StoreProfileRouter = () => {
    return (
        <Routes>
            <Route path={'/*'} element={<StoreProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    ) as any;
};

export default StoreProfileRouter;
