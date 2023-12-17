import Loader from 'components/atoms/Loader/Loader';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { BrandsInterface } from 'types';
import InventoryNavigation from '../InventoryNavigation';
import BrandForm from './Components/BrandForm';
import { useBrandsApi } from 'api/useBrandsApi';
import { useFormik } from 'formik';
import brandFormValidations from 'helpers/Validations/brandFormValidations';
import toast from 'react-hot-toast';

const BrandManage = () => {
    const navigate = useNavigate();
    const { storeData, string }: any = useOutletContext();
    const { storeCode, brandId } = useParams();
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);
    const [brand, setBrand] = useState<BrandsInterface | any>(null);

    const { data: brandDataRes, isFetching: loadBrand } = useBrandsApi().useGetBrandById({
        storeCode,
        brandId,
    });

    const { mutateAsync: updateBrand, isLoading } = useBrandsApi().useUpdateBrand();

    const formik = useFormik({
        initialValues: brand,
        validationSchema: brandFormValidations,
        onSubmit: values => {
            updateBrand({ storeCode, data: values })
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
        formik.setValues(brand);
    }, [brand]);

    useEffect(() => {
        if (!brandDataRes || loadBrand) return;
        setBrand({
            ...brandDataRes.data,
            descriptions: storeData?.supportedLanguages.map(({ code }) => {
                console.log(brandDataRes.data.descriptions.find(el => el.language === code));
                if (brandDataRes.data.descriptions.find(el => el.language === code)) {
                    return { ...brandDataRes.data.descriptions.find(el => el.language === code) };
                } else
                    return {
                        language: code,
                        name: '',
                    };
            }),
        });
    }, [brandDataRes]);

    const handleSetTitle = title => {
        setTitle(title);
    };

    const handleSetActionButtons = buttons => {
        setButtons(buttons);
    };

    return (
        <>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
            >
                {(loadBrand || isLoading) && <Loader />}
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
        </>
    );
};

export default BrandManage;
