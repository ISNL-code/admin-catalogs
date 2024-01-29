import Loader from 'components/atoms/Loader/Loader';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import PageHeader from 'components/organisms/Panels/PageHeader';
import ProductsManageTabsPanel from 'components/organisms/Panels/ProductsManageTabsPanel';
import {
    MainContextInterface,
    OptionsValueInterface,
    ProductAttrOptionsInterface,
    RetailerContextInterface,
} from 'types';
import InventoryNavigation from '../InventoryNavigation';
import CategoriesForm from './components/CategoriesForm';
import SizesForm from './components/SizesForm';
import PromoForm from './components/PromoForm';
import { useOptionsApi } from 'api/useOptionsApi';

const ProductOptionsManage = () => {
    const navigate = useNavigate();
    const { string }: MainContextInterface | RetailerContextInterface = useOutletContext();
    const { storeCode, productId } = useParams();
    const [optionsAttributes, setOptionsAttributes] = useState<OptionsValueInterface[] | any>([]);
    const [productOptionsAttributes, setProductOptionsAttributes] = useState<ProductAttrOptionsInterface[] | any>([]);

    const { mutateAsync: addProductAttribute } = useOptionsApi().useAddProductOption();
    const { mutateAsync: deleteProductAttribute } = useOptionsApi().useDeleteProductOption();

    const { data: optionsValuesRes, isFetching: loadListOfOptions } = useOptionsApi().useGetValuesList({
        storeCode,
        page: 0,
        countPerPage: 500,
    });
    const {
        data: productOptionsRes,
        isFetching: loadProductOptions,
        refetch: refreshProductOptions,
    } = useOptionsApi().useGetProductOptionsById({
        productId,
        storeCode,
    });

    useEffect(() => {
        if (!optionsValuesRes || loadListOfOptions) return;
        setOptionsAttributes(optionsValuesRes.data.optionValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsValuesRes]);

    useEffect(() => {
        if (!productOptionsRes || loadProductOptions) return;

        setProductOptionsAttributes(productOptionsRes.data.attributes);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productOptionsRes]);

    return (
        <>
            {loadListOfOptions && <Loader />}
            <InventoryNavigation />
            <PageHeader title={string?.options}>
                <ActionPanel
                    button={[
                        {
                            name: 'cancel',
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
                        path: `/store-inventory/${storeCode}/products/${productId}/main`,
                    },
                    {
                        name: 'models',
                        path: `/store-inventory/${storeCode}/products/${productId}/models`,
                    },
                    {
                        name: 'options',
                        path: `/store-inventory/${storeCode}/products/${productId}/options`,
                    },
                ]}
            />
            <CategoriesForm />
            <SizesForm
                addProductAttribute={addProductAttribute}
                deleteProductAttribute={deleteProductAttribute}
                productOptions={productOptionsAttributes}
                optionsData={optionsAttributes
                    .filter(el => el.descriptions.some(el => el.description === `SIZE`))
                    .sort((a, b) => {
                        var regex = /[\d|,|.|e|E|]+/g;
                        return a.code.match(regex) - b.code.match(regex);
                    })}
                refreshProductOptions={refreshProductOptions}
            />
            <PromoForm
                addProductAttribute={addProductAttribute}
                deleteProductAttribute={deleteProductAttribute}
                productOptions={productOptionsAttributes}
                optionsData={optionsAttributes
                    .filter(el => el.descriptions.some(el => el.description === `PROMO`))
                    .sort((a, b) => {
                        var regex = /[\d|,|.|e|E|]+/g;
                        return a.code.match(regex) - b.code.match(regex);
                    })}
                refreshProductOptions={refreshProductOptions}
            />
        </>
    );
};

export default ProductOptionsManage;
