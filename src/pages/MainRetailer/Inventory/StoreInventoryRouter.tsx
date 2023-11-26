import { Routes, Route, Navigate } from 'react-router-dom';
import ProductCreate from './Product/ProductCreate';
import ProductManage from './Product/ProductManage';
import StoreMarket from './StoreInventory';

const StoreInventoryRouter = () => {
    return (
        <Routes>
            <Route element={<StoreMarket />}>
                <Route path={'/*'} />
            </Route>
            <Route path={'/products/:productId/*'} element={<ProductManage />} />
            <Route path={'/products/create'} element={<ProductCreate />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    ) as any;
};

export default StoreInventoryRouter;
