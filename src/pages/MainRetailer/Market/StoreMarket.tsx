import ActionPanel from 'components/organisms/Panels/ActionPanel';
import MarketTabsPanel from 'components/organisms/Panels/MarketTabsPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useState } from 'react';
import { Navigate, Route, Routes, useOutletContext, useParams } from 'react-router-dom';
import { RetailerContextInterface } from 'types';
import Orders from './components/Orders';

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
            <MarketTabsPanel
                nav={[
                    {
                        name: 'orders',
                        path: `/store-market/${storeCodeValue}/orders`,
                        disabled: false,
                    },
                ]}
            />
            <PageHeader title={title}>
                <ActionPanel button={buttons} />
            </PageHeader>
            <Routes>
                <Route
                    path={'/orders'}
                    element={<Orders handleSetTitle={handleSetTitle} handleSetActionButtons={handleSetActionButtons} />}
                />
                <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
};

export default StoreInventory;
