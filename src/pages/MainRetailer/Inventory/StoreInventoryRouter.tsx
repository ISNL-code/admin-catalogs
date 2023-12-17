import { Routes, Route, Navigate } from 'react-router-dom';
import BrandCreate from './Brands/BrandCreate';
import BrandManage from './Brands/BrandManage';
import ColorsCreate from './Options/Colors/ColorsCreate';
import ColorsManage from './Options/Colors/ColorsManage';
import OptionsManage from './Options/OptionsManage';
import PromoCreate from './Options/Promo/PromoCreate';
import PromoManage from './Options/Promo/PromoManage';
import SizesCreate from './Options/Sizes/SizesCreate';
import SizesManage from './Options/Sizes/SizesManage';
import ProductCreate from './Product/ProductCreate';
import ProductGeneralManage from './Product/ProductGeneralManage';
import ProductOptionsManage from './Product/ProductOptionsManage';
import ProductModelsManage from './Product/ProductsModelsManage';
import StoreMarket from './StoreInventory';

const StoreInventoryRouter = () => {
    return (
        <Routes>
            <Route element={<StoreMarket />}>
                <Route path={'/*'} />
            </Route>
            <Route path={'/products/:productId/main'} element={<ProductGeneralManage />} />
            <Route path={'/products/:productId/models'} element={<ProductModelsManage />} />
            <Route path={'/products/:productId/options'} element={<ProductOptionsManage />} />
            <Route path={'/products/create'} element={<ProductCreate />} />
            <Route path={'/brands/:brandId/edit'} element={<BrandManage />} />
            <Route path={'/brands/create'} element={<BrandCreate />} />
            <Route path={'/options/*'} element={<OptionsManage />} />
            <Route path={'/options/colors/create'} element={<ColorsCreate />} />
            <Route path={'/options/colors/:colorId/edit'} element={<ColorsManage />} />
            <Route path={'/options/sizes/:sizeId/edit'} element={<SizesManage />} />
            <Route path={'/options/promos/:promoId/edit'} element={<PromoManage />} />
            <Route path={'/options/sizes/create'} element={<SizesCreate />} />
            <Route path={'/options/promos/create'} element={<PromoCreate />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    ) as any;
};

export default StoreInventoryRouter;
