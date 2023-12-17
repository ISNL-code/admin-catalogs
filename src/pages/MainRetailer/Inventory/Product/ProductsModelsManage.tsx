import Loader from 'components/atoms/Loader/Loader';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useProductsApi } from 'api/useProductsApi';
import PageHeader from 'components/organisms/Panels/PageHeader';
import ProductsManageTabsPanel from 'components/organisms/Panels/ProductsManageTabsPanel';
import {
    MainContextInterface,
    ManageProductInterface,
    ModelInterface,
    ProductVariantInterface,
    RetailerContextInterface,
} from 'types';
import InventoryNavigation from '../InventoryNavigation';
import CreateModelForm from './components/CreateModelForm';
import ModelsList from './components/ModelsList';
import { useVariationsApi } from 'api/useVariationsApi';
import { useFormik } from 'formik';
import modelFormValidations from 'helpers/Validations/modelFormValidations';
import toast from 'react-hot-toast';

const INIT_MODEL_VALUE = {
    available: true,
    sku: '',
    code: '',
    defaultSelection: false,
    dateAvailable: Date.now(),
    sortOrder: '1',
    variation: null,
    productVariantGroup: '',
    inventory: {
        price: {
            price: '',
        },
        quantity: 10000,
    },
    variationCode: '',
};

const ProductModelsManage = () => {
    const { string }: MainContextInterface | RetailerContextInterface = useOutletContext();
    const { storeCode, productId } = useParams();
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);
    const [product, setProduct] = useState<ManageProductInterface | any>(null);
    const [colorsList, setColorsList] = useState([]);
    const [productVariants, setProductVariants] = useState<ProductVariantInterface[] | any>(null);
    const [newModelData, setNewModelData] = useState<ModelInterface | any>(INIT_MODEL_VALUE);

    const { data: productDataRes, isFetching: loadProducts } = useProductsApi().useGetProductById({
        storeCode,
        productId,
    });

    const { mutateAsync: switchProduct } = useProductsApi().useSwitchProduct();
    const { refetch: checkUnique } = useProductsApi().useCheckUniqueModelSku({
        storeCode,
        code: newModelData?.sku,
        productId,
    });

    const { data: colorsListRes, isFetching: loadColorsList } = useVariationsApi().useGetListOfVariations({
        storeCode,
    });

    const formik = useFormik({
        initialValues: newModelData,
        validationSchema: modelFormValidations,
        onSubmit: values => {
            checkUnique().then(res => {
                if ((res as any).data.data.exists) {
                    toast.error(string?.model_with_this_vendor_code_is_registered);
                    return;
                }
                return res;
            });
        },
    });

    useEffect(() => {
        formik.setValues(newModelData);
    }, [newModelData]);

    const {
        data: variantsRes,
        refetch: updateVariants,
        isFetching: loadVariants,
    } = useProductsApi().useGetVariantsByProductID({
        id: productId,
        storeCode,
    });

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
            descriptions: product.descriptions,
        });
    }, [productDataRes]);

    useEffect(() => {
        if (!variantsRes || loadVariants) return;
        setProductVariants(variantsRes.data.items);
    }, [variantsRes]);

    useEffect(() => {
        if (!colorsListRes || loadColorsList) return;

        setColorsList(colorsListRes.data.items);
    }, [colorsListRes]);

    return (
        <>
            {loadProducts && <Loader />}
            <InventoryNavigation />
            <PageHeader title={string?.models}>
                <ActionPanel
                    button={[
                        {
                            name: product?.visible && productVariants?.length ? 'deactivate' : 'activate',
                            disabled: !productVariants?.length,
                            tooltip: !productVariants?.length ? string?.add_models_before : '',
                            action: () => {
                                switchProduct({
                                    id: product.id,
                                    complete: !product.visible,
                                });
                                setProduct({ ...product, visible: !product.visible });
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
            <form
                onSubmit={e => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
            >
                <CreateModelForm
                    colorsOptions={colorsList}
                    data={newModelData}
                    setNewModelData={setNewModelData}
                    formik={formik}
                />
            </form>
            {productVariants?.map(variant => (
                <ModelsList variant={variant} colorsOptions={colorsList} />
            ))}
        </>
    );
};

export default ProductModelsManage;
