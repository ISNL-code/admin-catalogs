import { Box } from '@mui/material';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useState } from 'react';
import { Navigate, Route, Routes, useOutletContext, useParams } from 'react-router-dom';
import { RetailerContextInterface } from 'types';
import BrandsList from './Brands/BrandsList';
import CategoriesList from './Categories/CategoriesList';
import ProductsList from './Product/ProductsList';
import InventoryNavigation from './InventoryNavigation';
import ColorsList from './Options/Colors/ColorsList';

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
        <Box>
            <InventoryNavigation />
            <PageHeader title={title}>
                <ActionPanel button={buttons} />
            </PageHeader>
            <Routes>
                <Route
                    path={'/products'}
                    element={
                        <ProductsList handleSetTitle={handleSetTitle} handleSetActionButtons={handleSetActionButtons} />
                    }
                />
                <Route
                    path={'/brands'}
                    element={
                        <BrandsList handleSetTitle={handleSetTitle} handleSetActionButtons={handleSetActionButtons} />
                    }
                />
                <Route
                    path={'/colors'}
                    element={
                        <ColorsList handleSetTitle={handleSetTitle} handleSetActionButtons={handleSetActionButtons} />
                    }
                />
                <Route
                    path={'/categories'}
                    element={
                        <CategoriesList
                            handleSetTitle={handleSetTitle}
                            handleSetActionButtons={handleSetActionButtons}
                        />
                    }
                />

                <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
        </Box>
    );
};

export default StoreInventory;
