import Loader from 'components/atoms/Loader/Loader';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ProductGeneralForm from './components/ProductGeneralForm';
import { useProductsApi } from 'api/useProductsApi';
import PageHeader from 'components/organisms/Panels/PageHeader';
import ProductsManageTabsPanel from 'components/organisms/Panels/ProductsManageTabsPanel';
import { BrandsInterface, MainContextInterface, ManageProductInterface, RetailerContextInterface } from 'types';
import InventoryNavigation from '../InventoryNavigation';
import { useFormik } from 'formik';
import productFormValidations from 'helpers/Validations/productFormValidations';
import { useBrandsApi } from 'api/useBrandsApi';
import toast from 'react-hot-toast';

const INIT_PRODUCT_DATA = {
    sku: '',
    available: false,
    visible: false,
    dateAvailable: '',
    manufacturer: '',
    type: null,
    display: false,
    canBePurchased: false,
    timeBound: false,
    price: '',
    quantity: 1000000,
    sortOrder: '',
    productSpecifications: {
        weight: '',
        height: '',
        width: '',
        length: '',
    },
    descriptions: [],
};

const ProductGeneralManage = () => {
    const navigate = useNavigate();
    const { string, storeData }: MainContextInterface | RetailerContextInterface = useOutletContext();
    const { storeCode, productId } = useParams();
    const [product, setProduct] = useState<ManageProductInterface>(INIT_PRODUCT_DATA);
    const [brandsList, setBrandsList] = useState<BrandsInterface[] | any>(null);

    const { data: productDataRes, isFetching: loadProducts } = useProductsApi().useGetProductById({
        storeCode,
        productId,
        lang: '_all',
    });

    const { mutateAsync: updateProduct, isLoading } = useProductsApi().useUpdateProduct();

    const { data: brandsRes, isFetching } = useBrandsApi().useGetBrandsList({
        storeCode,
        page: 0,
        countPerPage: 100,
        lang: storeData?.defaultLanguage,
    });

    const formik = useFormik({
        initialValues: product,
        validationSchema: productFormValidations,
        onSubmit: values => {
            updateProduct({ data: { ...values, price: values.price.replaceAll(',', '') }, storeCode })
                .then(() => {
                    toast.success(string?.updated);
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                });
        },
    });

    useEffect(() => {
        formik.setValues(product); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product]);

    useEffect(() => {
        if (!productDataRes || loadProducts) return;

        const product = productDataRes.data;
        setProduct({
            id: product.id,
            sku: product.sku,
            visible: product.visible,
            dateAvailable: product.dateAvailable,
            manufacturer: product.manufacturer.code,
            type: product.type,
            display: true,
            canBePurchased: product.canBePurchased,
            timeBound: false,
            price: product.inventory.price,
            quantity: product.inventory.quantity,
            sortOrder: product.sortOrder,
            productSpecifications: product.productSpecifications,
            descriptions: storeData?.supportedLanguages.map(({ code }) => {
                if (product.descriptions.find(el => el.language === code)) {
                    return { ...product.descriptions.find(el => el.language === code) };
                } else
                    return {
                        language: code,
                        name: '',
                        description: '',
                    };
            }),
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productDataRes, storeData, loadProducts]);

    useEffect(() => {
        if (!brandsRes || isFetching) return;

        setBrandsList(brandsRes?.data.manufacturers as BrandsInterface[]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brandsRes, storeData, isFetching]);

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            {(loadProducts || isLoading) && <Loader />}
            <InventoryNavigation />
            <PageHeader title={string?.main}>
                <ActionPanel
                    button={[
                        {
                            name: 'cancel',
                            action: () => {
                                navigate(-1);
                            },
                        },
                        { name: 'save', action: () => {} },
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

            <ProductGeneralForm data={product} formik={formik} brandsList={brandsList} setProduct={setProduct} />
        </form>
    );
};

export default ProductGeneralManage;
