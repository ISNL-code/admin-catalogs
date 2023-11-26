import { Box, Typography } from '@mui/material';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import ProductsTabsPanel from 'components/organisms/Panels/ProductsTabsPanel';
import { useState } from 'react';
import { Navigate, Route, Routes, useOutletContext, useParams } from 'react-router-dom';
import { RetailerContextInterface } from 'types';
import Brands from './components/Brands';
import Categories from './components/Categories';
import ProductOptions from './components/ProductOptions';
import Products from './components/Products';

const StoreInventory = () => {
    const { userProfile, string }: RetailerContextInterface = useOutletContext();
    const { storeCode } = useParams();
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);

    const storeCodeValue = storeCode || userProfile.merchant;

    const handleSetTitle = title => {
        setTitle(title);
    };

    const handleSetActionButtons = buttons => {
        setButtons(buttons);
    };

    return (
        <>
            <ProductsTabsPanel
                nav={[
                    {
                        name: 'products',
                        path: `/store-inventory/${storeCodeValue}/products`,
                        disabled: false,
                    },
                    {
                        name: 'brands',
                        path: `/store-inventory/${storeCodeValue}/brands`,
                        disabled: false,
                    },
                    {
                        name: 'categories',
                        path: `/store-inventory/${storeCodeValue}/categories`,
                        disabled: false,
                    },
                    {
                        name: 'product-options',
                        path: `/store-inventory/${storeCodeValue}/product-options`,
                        disabled: false,
                    },
                ]}
            />
            <PageHeader title={title}>
                <ActionPanel button={buttons} />
            </PageHeader>
            <Routes>
                <Route
                    path={'/products'}
                    element={
                        <Products handleSetTitle={handleSetTitle} handleSetActionButtons={handleSetActionButtons} />
                    }
                />
                <Route
                    path={'/brands'}
                    element={<Brands handleSetTitle={handleSetTitle} handleSetActionButtons={handleSetActionButtons} />}
                />
                <Route
                    path={'/categories'}
                    element={
                        <Categories handleSetTitle={handleSetTitle} handleSetActionButtons={handleSetActionButtons} />
                    }
                />
                <Route
                    path={'/product-options'}
                    element={
                        <ProductOptions
                            handleSetTitle={handleSetTitle}
                            handleSetActionButtons={handleSetActionButtons}
                        />
                    }
                />
                <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

export default StoreInventory;
