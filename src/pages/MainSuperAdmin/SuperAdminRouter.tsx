import { Routes, Route, Navigate } from 'react-router-dom';
import CreateStore from './StoreAdjust/CreateStore';
import CreateUser from './StoreAdjust/CreateUser';
import EditUser from './StoreAdjust/EditUser';
import ManageStore from './StoreAdjust/ManageStore';
import Stores from './Stores/Stores';

const SuperAdminRouter = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Stores />} />
            <Route path={'/store/create'} element={<CreateStore />} />
            <Route path={'/store/manage/:storeCode/*'} element={<ManageStore />} />
            <Route path={'/store/manage/:storeCode/users/create'} element={<CreateUser />} />
            <Route path={'/store/manage/:storeCode/users/edit/:userId'} element={<EditUser />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
    ) as any;
};

export default SuperAdminRouter;
