import { useOptionsApi } from 'api/useOptionsApi';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useFormik } from 'formik';
import colorFormValidations from 'helpers/Validations/colorFormValidations';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import InventoryNavigation from '../../InventoryNavigation';
import ColorsForm from './components/ColorsForm';
import toast from 'react-hot-toast';
import Loader from 'components/atoms/Loader/Loader';

const ColorsManage = () => {
    const { storeData, string }: any = useOutletContext();
    const { storeCode, colorId } = useParams();
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);
    const [valueData, setValueData] = useState<any>(null);
    const [valuesList, setValuesList] = useState<any>([]);
    const [initColor, setInitColor] = useState(null);

    const { data: valuesListRes } = useOptionsApi().useGetValuesList({ storeCode, page: 0, countPerPage: 500 });
    const { data: valueItemRes, isFetching } = useOptionsApi().useGetValueById({ storeCode, valueId: colorId });
    const { mutateAsync: updateValue } = useOptionsApi().useUpdateValue();

    const formik = useFormik({
        initialValues: valueData,
        validationSchema: colorFormValidations,
        onSubmit: values => {
            if (valuesList?.some(el => el?.code === valueData?.code && initColor !== valueData?.code)) {
                toast.error(string?.color_with_this_code_is_registered);
            } else {
                updateValue({ storeCode, data: values })
                    .then(() => {
                        toast.success(string?.updated);
                    })
                    .catch(err => {
                        console.log(err);
                        toast.error(err.message);
                    });
            }
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setInitColor(valueItemRes.data.code);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueItemRes]);

    useEffect(() => {
        if (!valuesListRes) return;
        setValuesList(valuesListRes.data.optionValues);
    }, [valuesListRes]);

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
            <ColorsForm
                handleSetTitle={handleSetTitle}
                handleSetActionButtons={handleSetActionButtons}
                data={valueData}
                setValueData={setValueData}
                formik={formik}
            />
        </form>
    );
};

export default ColorsManage;
