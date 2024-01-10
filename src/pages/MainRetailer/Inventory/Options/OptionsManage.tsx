import ActionPanel from 'components/organisms/Panels/ActionPanel';
import { useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import PageHeader from 'components/organisms/Panels/PageHeader';
import InventoryNavigation from '../InventoryNavigation';
import InventoryOptionsManagePanel from 'components/organisms/Panels/InventoryOptionsManagePanel';
import SizesList from './Sizes/SizesList';
import PromoList from './Promo/PromoList';
import ColorsList from './Colors/ColorsList';

const OptionsManage = () => {
    const { storeCode } = useParams();
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);

    const handleSetTitle = title => {
        setTitle(title);
    };

    const handleSetActionButtons = buttons => {
        setButtons(buttons);
    };

    return (
        <>
            <InventoryNavigation />
            <PageHeader title={title}>
                <ActionPanel button={buttons} />
            </PageHeader>
            <InventoryOptionsManagePanel
                nav={[
                    {
                        name: 'colors',
                        path: `/store-inventory/${storeCode}/options/colors`,
                    },
                    {
                        name: 'sizes',
                        path: `/store-inventory/${storeCode}/options/sizes`,
                        // disabled: true,
                    },
                    {
                        name: 'promos',
                        path: `/store-inventory/${storeCode}/options/promos`,
                        // disabled: true,
                    },
                ]}
            />
            <Routes>
                <Route
                    path={'/colors'}
                    element={
                        <ColorsList handleSetTitle={handleSetTitle} handleSetActionButtons={handleSetActionButtons} />
                    }
                />
                <Route
                    path={'/sizes'}
                    element={
                        <SizesList handleSetTitle={handleSetTitle} handleSetActionButtons={handleSetActionButtons} />
                    }
                />
                <Route
                    path={'/promos'}
                    element={
                        <PromoList handleSetTitle={handleSetTitle} handleSetActionButtons={handleSetActionButtons} />
                    }
                />

                <Route path="*" element={<Navigate to={`/store-inventory/${storeCode}/options/colors`} replace />} />
            </Routes>
        </>
    );
};

export default OptionsManage;
