import { useOptionsApi } from 'api/useOptionsApi';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import InventoryNavigation from '../../InventoryNavigation';
import toast from 'react-hot-toast';
import Loader from 'components/atoms/Loader/Loader';
import SizesForm from './components/SizesForm';
import sizeFormValidations from 'helpers/Validations/sizeFormValidations';

const SizesManage = () => {
    const { string, storeData }: any = useOutletContext();
    const { storeCode, sizeId } = useParams();
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);
    const [valueData, setValueData] = useState<any>(null);

    const { data: valueItemRes, isFetching } = useOptionsApi().useGetValueById({ storeCode, valueId: sizeId });
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueData]);

    useEffect(() => {
        if (!valueItemRes || isFetching) return;
        setValueData({
            ...valueItemRes.data,

            descriptions: storeData?.supportedLanguages.map(({ code }) => {
                if (valueItemRes.data.descriptions.find(el => el.language === code)) {
                    return { ...valueItemRes.data.descriptions.find(el => el.language === code) };
                } else
                    return {
                        language: code,
                        name: '',
                    };
            }),
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <SizesForm
                handleSetTitle={handleSetTitle}
                handleSetActionButtons={handleSetActionButtons}
                data={valueData}
                setValueData={setValueData}
                formik={formik}
            />
        </form>
    );
};

export default SizesManage;
