import Loader from 'components/atoms/Loader/Loader';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { EditBrandInterface } from 'types';
import InventoryNavigation from '../InventoryNavigation';
import BrandForm from './Components/BrandForm';
import brandFormValidations from 'helpers/Validations/brandFormValidations';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useBrandsApi } from 'api/useBrandsApi';
import toast from 'react-hot-toast';

const INITIAL_BRAND_DATA = {
    code: '',
    store: '',
    order: '1',
    selectedLanguage: 'ua',
    descriptions: [],
};

const BrandCreate = () => {
    const navigate = useNavigate();
    const { storeData, string }: any = useOutletContext();
    const { storeCode } = useParams();
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);
    const [brand, setBrand] = useState<EditBrandInterface>(INITIAL_BRAND_DATA);

    const { mutateAsync: createBrand, isLoading } = useBrandsApi().useCreateBrand();
    const { refetch: checkUnique } = useBrandsApi().useCheckBrandUnique({ code: brand.code });

    const formik = useFormik({
        initialValues: brand,
        validationSchema: brandFormValidations,
        onSubmit: values => {
            checkUnique()
                .then(res => {
                    if ((res as any).data.data.exists) {
                        toast.error(string?.brand_with_this_code_is_registered);
                        return;
                    }
                    return res;
                })
                .then(res => {
                    if (res) {
                        createBrand({ storeCode, data: values })
                            .then(() => {
                                toast.success(string?.created);
                                navigate(-1);
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
                });
        },
    });

    useEffect(() => {
        setBrand({
            ...brand,
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
        formik.setValues(brand);
    }, [brand]);

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
            <PageHeader title={title}>
                <ActionPanel button={buttons} />
            </PageHeader>
            <BrandForm
                handleSetTitle={handleSetTitle}
                data={brand}
                handleSetActionButtons={handleSetActionButtons}
                formik={formik}
                setBrand={setBrand}
            />
        </form>
    );
};

export default BrandCreate;
