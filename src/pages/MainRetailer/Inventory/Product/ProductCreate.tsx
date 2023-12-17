import { Route, Routes, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useDevice } from 'hooks/useDevice';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import Loader from 'components/atoms/Loader/Loader';
import ProductsManageTabsPanel from 'components/organisms/Panels/ProductsManageTabsPanel';
import { useEffect, useState } from 'react';
import PageHeader from 'components/organisms/Panels/PageHeader';
import ProductGeneralForm from './components/ProductGeneralForm';
import InventoryNavigation from '../InventoryNavigation';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useProductsApi } from 'api/useProductsApi';
import productFormValidations from 'helpers/Validations/productFormValidations';
import { useBrandsApi } from 'api/useBrandsApi';
import { BrandsInterface } from 'types';

const INIT_PRODUCT_DATA = {
    sku: '',
    visible: false,
    manufacturer: '',
    type: null,
    display: false,
    canBePurchased: false,
    timeBound: false,
    price: '',
    quantity: 100000,
    sortOrder: '',
    productSpecifications: {
        weight: '',
        height: '',
        width: '',
        length: '',
    },
    descriptions: [],
};

const ProductCreate = () => {
    const navigate = useNavigate();
    const { storeCode } = useParams();
    const { sx } = useDevice();
    const { string, storeData }: any = useOutletContext();
    const [product, setProduct] = useState(INIT_PRODUCT_DATA);
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);
    const [brandsList, setBrandsList] = useState<BrandsInterface[] | any>(null);

    const { mutateAsync: createProduct, isLoading } = useProductsApi().useCreateProduct();

    const { data: brandsRes, isFetching } = useBrandsApi().useGetBrandsList({ storeCode, page: 0, countPerPage: 100 });

    const formik = useFormik({
        initialValues: product,
        validationSchema: productFormValidations,
        onSubmit: values => {
            createProduct({ data: { ...values, sku: Date.now().toString() }, storeCode })
                .then(res => {
                    toast.success(string?.created);
                    navigate(`/store-inventory/${storeCode}/products/${res.data.id}/main`);
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                });
        },
    });

    useEffect(() => {
        setProduct({
            ...product,
            descriptions: storeData?.supportedLanguages.map(({ code }) => {
                return {
                    language: code,
                    name: '',
                    description: '',
                    friendlyUrl: '',
                    keyWords: '',
                    highlights: '',
                    metaDescription: '',
                    title: '',
                };
            }),
        });
    }, [storeData]);

    useEffect(() => {
        formik.setValues(product);
    }, [product]);

    useEffect(() => {
        if (!brandsRes || isFetching) return;

        setBrandsList(brandsRes?.data.manufacturers as BrandsInterface[]);
    }, [brandsRes]);

    const handleSetTitle = title => {
        setTitle(title);
    };

    const handleSetActionButtons = buttons => {
        setButtons(buttons);
    };

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            {isLoading && <Loader />}
            <InventoryNavigation />
            <PageHeader title={string?.create}>
                <ActionPanel
                    button={[
                        {
                            name: 'save',
                            action: () => {},
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
            <Routes>
                <Route
                    path={'/'}
                    element={
                        <ProductGeneralForm
                            data={product}
                            formik={formik}
                            brandsList={brandsList}
                            setProduct={setProduct}
                        />
                    }
                />
            </Routes>
        </form>
    );
};

export default ProductCreate;
