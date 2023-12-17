import { useOptionsApi } from 'api/useOptionsApi';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import InventoryNavigation from '../../InventoryNavigation';
import toast from 'react-hot-toast';
import Loader from 'components/atoms/Loader/Loader';
import sizeFormValidations from 'helpers/Validations/sizeFormValidations';
import PromoForm from './components/PromoForm';

const PromoManage = () => {
    const { string, storeData }: any = useOutletContext();
    const { storeCode, promoId } = useParams();
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);
    const [valueData, setValueData] = useState<any>(null);

    const { refetch: checkUnique } = useOptionsApi().useCheckValuesUnique({ code: valueData?.code });
    const { data: valueItemRes, isFetching } = useOptionsApi().useGetValueById({ storeCode, valueId: promoId });
    const { mutateAsync: updateValue } = useOptionsApi().useUpdateValue();

    const formik = useFormik({
        initialValues: valueData,
        validationSchema: sizeFormValidations,
        onSubmit: values => {
            updateValue({ storeCode, data: values })
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
        formik.setValues(valueData);
    }, [valueData]);

    useEffect(() => {
        if (!valueItemRes || isFetching) return;
        setValueData({
            ...valueItemRes.data,

            descriptions: storeData?.supportedLanguages.map(({ code }) => {
                console.log(valueItemRes.data.descriptions.find(el => el.language === code));
                if (valueItemRes.data.descriptions.find(el => el.language === code)) {
                    return { ...valueItemRes.data.descriptions.find(el => el.language === code) };
                } else
                    return {
                        language: code,
                        name: '',
                    };
            }),
        });
    }, [valueItemRes]);

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
            {false && <Loader />}
            <InventoryNavigation />
            <PageHeader title={title}>
                <ActionPanel button={buttons} />
            </PageHeader>
            <PromoForm
                handleSetTitle={handleSetTitle}
                handleSetActionButtons={handleSetActionButtons}
                data={valueData}
                setValueData={setValueData}
                formik={formik}
            />
        </form>
    );
};

export default PromoManage;
