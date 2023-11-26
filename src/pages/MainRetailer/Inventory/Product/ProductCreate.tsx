import { Box, Typography } from '@mui/material';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import Grid from '@mui/material/Unstable_Grid2';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import Loader from 'components/atoms/Loader/Loader';
import ProductsManageTabsPanel from 'components/organisms/Panels/ProductsManageTabsPanel';
import { useState } from 'react';
import PageHeader from 'components/organisms/Panels/PageHeader';
import ProductsTabsPanel from 'components/organisms/Panels/ProductsTabsPanel';

const INITIAL_PRODUCT_DATA = {
    sku: '',
    visible: false,
    dateAvailable: '',
    manufacturer: '',
    type: '',
    display: false,
    canBePurchased: false,
    timeBound: false,
    price: '00.00',
    quantity: 0,
    sortOrder: 0,
    productSpecifications: {
        weight: null,
        height: null,
        width: null,
        length: null,
    },
    descriptions: [
        {
            language: 'ua',
            name: '',
            highlights: '',
            friendlyUrl: '',
            description: '',
            title: '',
            keyWords: '',
            metaDescription: '',
        },
    ],
};

const ProductCreate = () => {
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const { sx } = useDevice();
    const { string }: any = useOutletContext();
    const [product, setProduct] = useState(INITIAL_PRODUCT_DATA);

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
            <PageHeader title={string?.create}>
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
                        path: `/store-inventory/${storeCode}/products/create`,
                        disabled: false,
                    },
                    {
                        name: 'models',
                        path: `/`,
                        disabled: true,
                    },
                    {
                        name: 'options',
                        path: `/`,
                        disabled: true,
                    },
                ]}
            />
            <Grid mt={1} container xs={12} sx={{ gap: 2, border: '1px solid #ccc', p: 2 }}></Grid>
        </>
    );
};

export default ProductCreate;
