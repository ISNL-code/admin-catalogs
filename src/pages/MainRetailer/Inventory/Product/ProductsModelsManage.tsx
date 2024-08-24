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
import { Box } from '@mui/material';
import EmptyImageInput from 'components/atoms/Media/EmptyImageInput';
import Grid from '@mui/material/Unstable_Grid2';
import OriginalPriceForm from './components/OriginalPriceForm';

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

const INIT_ORIGINAL_PRICE_VALUE = {
    available: false,
    sku: '',
    code: '',
    defaultSelection: false,
    dateAvailable: '',
    sortOrder: -10,
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
    const [colorsList, setColorsList] = useState<any>([]);
    const [productVariants, setProductVariants] = useState<ProductVariantInterface[] | any>(null);
    const [newModelData, setNewModelData] = useState<ModelInterface | any>(INIT_MODEL_VALUE);
    const [newOriginalPrice, setNewOriginalPrice] = useState<ModelInterface | any>(INIT_ORIGINAL_PRICE_VALUE);
    const { mutateAsync: addTableSizeImage } = useVariationsApi().useAddTableSizeImageMedia(); // eslint-disable-line

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

    const originalPriceFormik = useFormik({
        initialValues: newOriginalPrice,
        validationSchema: null,
        onSubmit: (values, { resetForm }) => {
            const checkDiscounts = originPrice => {
                const prices = productVariants.map(el => parseFloat(el.inventory?.price?.price));
                const originPriceFloat = parseFloat(originPrice);

                const isPriceValid = prices.every(discountPrice => originPriceFloat >= discountPrice);

                return isPriceValid;
            };

            if (!checkDiscounts(values.inventory.price.price.replaceAll(',', ''))) {
                toast.error(string?.must_be_higher_than_discount_prices);
            } else
                createModel({
                    productId,
                    data: {
                        ...values,
                        price: values.inventory.price.price.replaceAll(',', ''),
                        discounted: true,
                        variation: colorsList[0]?.id,
                        sku: 'ORIGINAL_PRICE',
                    },
                    storeCode,
                })
                    .then(res => {
                        createVariationGroup({ variantId: res.data.id, storeCode })
                            .then(() => {
                                toast.success(string?.created);
                                updateVariants();

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
        },
    });

    useEffect(() => {
        originalPriceFormik.setValues(newOriginalPrice);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newOriginalPrice]);

    const formik = useFormik({
        initialValues: newModelData,
        validationSchema: modelFormValidations,
        onSubmit: (values, { resetForm }) => {
            const checkDiscounts = discountPrice => {
                if (!originPrice) return true;

                const price = parseFloat(discountPrice);
                const originPriceFloat = parseFloat(originPrice.inventory?.price?.price);

                const isPriceValid = price <= originPriceFloat;

                return isPriceValid;
            };

            if (!checkDiscounts(values.inventory.price.price.replaceAll(',', ''))) {
                toast.error(string?.must_be_higher_than_discount_prices);
            } else
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

    const originPrice = productVariants?.find(el => {
        return el.sku === 'ORIGINAL_PRICE';
    });

    useEffect(() => {
        if (originPrice) setNewOriginalPrice(originPrice);
    }, [productVariants]); //eslint-disable-line

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
                    if (originPrice) return;
                    originalPriceFormik.handleSubmit();
                }}
            >
                <OriginalPriceForm
                    data={newOriginalPrice}
                    setNewOriginalPrice={setNewOriginalPrice}
                    formik={originalPriceFormik}
                    updateVariants={updateVariants}
                    discountedVariants={productVariants?.filter(el => {
                        return el.sku !== 'ORIGINAL_PRICE';
                    })}
                />
            </form>
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
                                    sx={{ border: '1px solid #ccc', maxHeight: 'auto', position: 'relative' }}
                                >
                                    {el?.imageUrl && (
                                        <Image
                                            height={1}
                                            width={1}
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
                                            maxWidth="500px"
                                            imageSizeShown
                                        />
                                    )}
                                </Box>
                            );
                        })}
                    {!product?.images?.find(el => el?.imageSizeTable) && (
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
                            />
                        </Box>
                    )}
                </Grid>
            )}
            {productVariants
                ?.filter(el => {
                    return el.sku !== 'ORIGINAL_PRICE';
                })
                ?.map((variant, idx) => (
                    <ModelsList
                        key={idx}
                        variant={variant}
                        setVariant={setProductVariants}
                        colorsOptions={colorsList}
                        updateVariants={updateVariants}
                        originPrice={newOriginalPrice}
                    />
                ))}
        </>
    );
};

export default ProductModelsManage;
