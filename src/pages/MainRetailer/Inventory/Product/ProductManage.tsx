import { Box, Typography } from '@mui/material';
import Loader from 'components/atoms/Loader/Loader';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import ProductOptions from './components/ProductOptions';
import ProductGeneral from './components/ProductGeneral';
import ProductModels from './components/ProductModels';
import { useProductsApi } from 'api/useProductsApi';
import PageHeader from 'components/organisms/Panels/PageHeader';
import ProductsManageTabsPanel from 'components/organisms/Panels/ProductsManageTabsPanel';
import ProductsTabsPanel from 'components/organisms/Panels/ProductsTabsPanel';

const ProductManage = () => {
    const { storeCode, productId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [product, setProduct] = useState();

    const { data: productDataRes, isFetching } = useProductsApi().useGetProductById({
        storeCode,
        productId,
    });

    useEffect(() => {
        if (!productDataRes || isFetching) return;
        console.log(productDataRes.data);
    }, [productDataRes]);

    const handleSetTitle = title => {
        setTitle(title);
    };

    return (
        <>
            {false && <Loader />}
            <ProductsTabsPanel
                nav={[
                    {
                        name: 'products',
                        path: `/store-inventory/${storeCode}/products`,
                        disabled: false,
                    },
                    {
                        name: 'brands',
                        path: `/store-inventory/${storeCode}/brands`,
                        disabled: false,
                    },
                    {
                        name: 'categories',
                        path: `/store-inventory/${storeCode}/categories`,
                        disabled: false,
                    },
                    {
                        name: 'product-options',
                        path: `/store-inventory/${storeCode}/product-options`,
                        disabled: false,
                    },
                ]}
            />
            <PageHeader title={title}>
                <ActionPanel
                    button={[
                        {
                            name: 'cancel',
                            disabled: false,
                            action: () => {
                                navigate(`/store-inventory/${storeCode}/products`);
                            },
                        },
                    ]}
                />
            </PageHeader>
            <ProductsManageTabsPanel
                nav={[
                    {
                        name: 'main',
                        path: `/store-inventory/${storeCode}/products/712/main`,
                        disabled: false,
                    },
                    {
                        name: 'models',
                        path: `/store-inventory/${storeCode}/products/712/models`,
                        disabled: false,
                    },
                    {
                        name: 'options',
                        path: `/store-inventory/${storeCode}/products/712/options`,
                        disabled: false,
                    },
                ]}
            />
            <Routes>
                <Route path={'/main'} element={<ProductGeneral handleSetTitle={handleSetTitle} />} />
                <Route path={'/models'} element={<ProductModels handleSetTitle={handleSetTitle} />} />
                <Route path={'/options'} element={<ProductOptions handleSetTitle={handleSetTitle} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

export default ProductManage;
