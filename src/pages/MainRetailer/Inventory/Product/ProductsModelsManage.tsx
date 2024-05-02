import Loader from 'components/atoms/Loader/Loader';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
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
    dateAvailable: '',
    sortOrder: '',
    variation: null,
    productVariantGroup: '',
    inventory: {
        price: {
            price: '',
        },
        quantity: 100009099,
    },
    variationCode: '',
};

const ProductModelsManage = () => {
    const navigate = useNavigate();
    const { string, storeData }: MainContextInterface | RetailerContextInterface = useOutletContext();
    const { storeCode, productId } = useParams();
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

    const {
        data: variantsRes,
        refetch: updateVariants,
        isFetching: loadVariants,
    } = useProductsApi().useGetVariantsByProductID({
        id: productId,
        storeCode,
    });
    const { data: colorsListRes, isFetching: loadColorsList } = useVariationsApi().useGetListOfVariations({
        storeCode,
        lang: storeData?.defaultLanguage,
    });
    const { mutateAsync: createModel } = useProductsApi().useCreateModelByProductID();
    const { mutateAsync: createVariationGroup } = useVariationsApi().useCreateVariationGroup();

    const formik = useFormik({
        initialValues: newModelData,
        validationSchema: modelFormValidations,
        onSubmit: (values, { resetForm }) => {
            checkUnique()
                .then(res => {
                    if ((res as any).data.data.exists) {
                        toast.error(string?.model_with_this_vendor_code_is_registered);
                        return;
                    }
                    return res;
                })
                .then(res => {
                    if (res) {
                        createModel({
                            productId,
                            data: {
                                ...values,
                                price: values.inventory.price.price.replaceAll(',', ''),
                                discounted: true,
                            },
                            storeCode,
                        })
                            .then(res => {
                                createVariationGroup({ variantId: res.data.id, storeCode })
                                    .then(() => {
                                        toast.success(string?.created);
                                        updateVariants();
                                        setNewModelData(INIT_MODEL_VALUE);
                                        resetForm();
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        toast.error(err.message);
                                    });
                            })
                            .catch(err => {
                                console.log(err);
                                toast.error(err.message);
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                })
                .finally();
        },
    });

    useEffect(() => {
        formik.setValues(newModelData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newModelData]);

    useEffect(() => {
        if (!productDataRes || loadProducts) return;

        const product = productDataRes.data;
        setProduct({
            visible: product.visible,
            ...product,
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productDataRes]);

    useEffect(() => {
        if (!variantsRes || loadVariants) return;

        setProductVariants(
            variantsRes.data.items.map(el => {
                return { ...el, variation: el.variation?.id, inventory: { price: { price: el.inventory[0]?.price } } };
            })
        ); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variantsRes]);

    useEffect(() => {
        if (!colorsListRes || loadColorsList) return;

        setColorsList(colorsListRes.data.items);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorsListRes]);

    return (
        <>
            {loadProducts && <Loader />}
            <InventoryNavigation />
            <PageHeader title={string?.models}>
                <ActionPanel
                    button={[
                        {
                            name: 'cancel',
                            action: () => {
                                navigate(`/store-inventory/${storeCode}/products`);
                            },
                        },
                        {
                            name: product?.visible && productVariants?.length ? 'deactivate' : 'activate',
                            disabled: !productVariants?.length,
                            tooltip: !productVariants?.length ? string?.add_models_before : '',
                            action: () => {
                                switchProduct({
                                    id: product.id,
                                    complete: !product.visible,
                                    storeCode,
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
                    const maxModels = storeData?.dataBaseStoreSettings.productModels;
                    if ((productVariants?.length as number) >= maxModels)
                        return toast.error(string?.your_limit + ' ' + maxModels + ' ' + string?.items);
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

            {productVariants?.map((variant, idx) => (
                <ModelsList
                    key={idx}
                    variant={variant}
                    setVariant={setProductVariants}
                    colorsOptions={colorsList}
                    updateVariants={updateVariants}
                />
            ))}
        </>
    );
};

export default ProductModelsManage;
