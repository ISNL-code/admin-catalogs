import { useOptionsApi } from 'api/useOptionsApi';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import InventoryNavigation from '../../InventoryNavigation';
import toast from 'react-hot-toast';
import Loader from 'components/atoms/Loader/Loader';
import promoFormValidations from 'helpers/Validations/promoFormValidations';
import PromoForm from './components/PromoForm';

const INITIAL_VALUE_DATA = {
    code: '',
    selectedLanguage: 'ua',
    descriptions: [],
};

const PromoCreate = () => {
    const navigate = useNavigate();
    const { storeData, string }: any = useOutletContext();
    const { storeCode } = useParams();
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);
    const [valueData, setValueData] = useState(INITIAL_VALUE_DATA);
    const { mutateAsync: createValue, isLoading: loadCreateValue } = useOptionsApi().useCreateValue();
    const { refetch: checkUnique } = useOptionsApi().useCheckValuesUnique({ code: valueData.code, storeCode });

    const formik = useFormik({
        initialValues: valueData,
        validationSchema: promoFormValidations,
        onSubmit: values => {
            checkUnique()
                .then(res => {
                    if ((res as any).data.data.exists) {
                        toast.error(string?.promo_with_this_code_is_registered);
                        return;
                    }
                    return res;
                })
                .then(res => {
                    if (res) {
                        createValue({ storeCode, data: values })
                            .then(_ => {
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
        formik.setValues(valueData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueData]);

    useEffect(() => {
        setValueData({
            ...valueData,

            descriptions: storeData?.supportedLanguages.map(({ code }) => {
                return {
                    language: code,
                    name: '',
                };
            }),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeData]);

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
            {loadCreateValue && <Loader />}
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

export default PromoCreate;
