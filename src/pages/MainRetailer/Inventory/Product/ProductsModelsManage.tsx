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
import Image from 'components/atoms/Media/Image';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import EmptyImageInput from 'components/atoms/Media/EmptyImageInput';
import Grid from '@mui/material/Unstable_Grid2';

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

    const { mutateAsync: addTableSizeImage } = useVariationsApi().useAddTableSizeImageMedia(); // eslint-disable-line
    const { mutateAsync: updateTableSizeImage } = useVariationsApi().useUpdateTableSizeImageMedia(); // eslint-disable-line

    const { mutateAsync: deleteTableSizeImage } = useVariationsApi().useDeleteTableSizeMedia(); // eslint-disable-line

    const {
        data: productDataRes,
        isFetching: loadProducts,
        refetch: updateProduct,
    } = useProductsApi().useGetProductById({
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
            {storeData?.mainStoreSettings?.sizes && (
                <Grid mt={1} xs={12} container sx={{ gap: 1 }}>
                    {product?.images &&
                        product?.images?.map(el => {
                            return (
                                <Box
                                    key={el.id}
                                    sx={{ border: '1px solid #ccc', maxHeight: '200px', position: 'relative' }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={el?.defaultImage}
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        updateTableSizeImage({
                                                            storeCode: storeCode || '',
                                                            imageId: el?.id,
                                                            isDefault: true,
                                                            productId: productId || '',
                                                        })
                                                            .then(_res => {
                                                                updateProduct();
                                                            })
                                                            .catch(err => {
                                                                console.log(err);
                                                                toast.error(err.message);
                                                            });
                                                    } else {
                                                        updateTableSizeImage({
                                                            storeCode: storeCode || '',
                                                            imageId: el?.id,
                                                            isDefault: false,
                                                            productId: productId || '',
                                                        })
                                                            .then(_res => {
                                                                updateProduct();
                                                            })
                                                            .catch(err => {
                                                                console.log(err);
                                                                toast.error(err.message);
                                                            });
                                                    }
                                                }}
                                            />
                                        }
                                        sx={{ position: 'absolute', top: 0, left: 5, zIndex: 1000 }}
                                        label={''}
                                    />
                                    {el?.imageUrl && (
                                        <Image
                                            height={1}
                                            width={10}
                                            imgUrl={el?.imageUrl}
                                            isRemovable={true}
                                            deleteAction={() =>
                                                deleteTableSizeImage({
                                                    storeCode: storeCode || '',
                                                    imageId: el?.id,
                                                })
                                                    .then(_res => {
                                                        updateProduct();
                                                    })
                                                    .catch(err => {
                                                        console.log(err);
                                                        toast.error(err.message);
                                                    })
                                            }
                                        />
                                    )}
                                </Box>
                            );
                        })}
                    <Box>
                        <EmptyImageInput
                            width={1}
                            height={1}
                            title=""
                            addAction={val => {
                                if (productId && storeCode)
                                    addTableSizeImage({ productId, storeCode, mediaFile: val })
                                        .then(_res => {
                                            updateProduct();
                                        })
                                        .catch(err => {
                                            console.log(err);
                                            toast.error(err.message);
                                        });
                            }}
                            imageQuota={1}
                            fileName="Table Size"
                            isWebp={false}
                            maxSize={0.3}
                        />
                    </Box>
                </Grid>
            )}
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
