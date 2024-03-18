import { Routes, Route, Navigate } from 'react-router-dom';
import CustomersList from './Customers/CustomersList';
import OrderManage from './Orders/OrderManage';
import OrdersList from './Orders/OrdersList';

const StoreMarketRouter = () => {
    return (
        <Routes>
            <Route path={'/orders'} element={<OrdersList />} />
            <Route path={'/customers'} element={<CustomersList />} />
            <Route path={'/orders/:orderId/manage'} element={<OrderManage />} />

            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
    ) as any;
};

export default StoreMarketRouter;
