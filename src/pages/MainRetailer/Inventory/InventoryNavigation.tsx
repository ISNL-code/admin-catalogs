import ProductsTabsPanel from 'components/organisms/Panels/ProductsTabsPanel';
import { useParams } from 'react-router-dom';

const InventoryNavigation = () => {
    const { storeCode } = useParams();
    return (
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
                    name: 'options',
                    path: `/store-inventory/${storeCode}/options`,
                    disabled: false,
                },
            ]}
        />
    );
};

export default InventoryNavigation;
