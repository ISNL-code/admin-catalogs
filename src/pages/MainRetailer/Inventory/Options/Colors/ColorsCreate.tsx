import { useOptionsApi } from 'api/useOptionsApi';
import { useVariationsApi } from 'api/useVariationsApi';
import ActionPanel from 'components/organisms/Panels/ActionPanel';
import PageHeader from 'components/organisms/Panels/PageHeader';
import { useFormik } from 'formik';
import colorFormValidations from 'helpers/Validations/colorFormValidations';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import InventoryNavigation from '../../InventoryNavigation';
import ColorsForm from './components/ColorsForm';
import toast from 'react-hot-toast';
import Loader from 'components/atoms/Loader/Loader';

const INITIAL_VALUE_DATA = {
    code: '',
    selectedLanguage: 'ua',
    descriptions: [],
};

const ColorsCreate = () => {
    const navigate = useNavigate();
    const { storeData, string }: any = useOutletContext();
    const { storeCode } = useParams();
    const [title, setTitle] = useState('');
    const [buttons, setButtons] = useState([]);
    const [valueData, setValueData] = useState(INITIAL_VALUE_DATA);
    const [optionId, setOptionId] = useState(null);
    const [valuesList, setValuesList] = useState<any>([]);

    const { data: valuesListRes } = useOptionsApi().useGetValuesList({ storeCode, page: 0, countPerPage: 500 });

    const { data: OptionsRes } = useOptionsApi().useGetOptionsList({ storeCode });
    const { mutateAsync: createValue, isLoading: loadCreateValue } = useOptionsApi().useCreateValue();
    const { mutateAsync: createVariation, isLoading: loadCreateVariation } = useVariationsApi().useCreateVariation();

    const formik = useFormik({
        initialValues: valueData,
        validationSchema: colorFormValidations,
        onSubmit: values => {
            if (valuesList?.some(el => el?.code === valueData?.code)) {
                toast.error(string?.color_with_this_code_is_registered);
            } else {
                createValue({ storeCode, data: values })
                    .then(res => {
                        const value = res.data as any;
                        createVariation({
                            storeCode,
                            data: {
                                code: value.code + storeCode,
                                option: optionId,
                                optionValue: value.id,
                            },
                        })
                            .then(_ => {
                                toast.success(string?.created);
                                navigate(-1);
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
        },
    });

    useEffect(() => {
        formik.setValues(valueData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueData]);

    useEffect(() => {
        if (!OptionsRes) return;
        setOptionId(OptionsRes.data.options.find(el => el.code === `COLOR`)?.id);
    }, [OptionsRes]);

    useEffect(() => {
        setValueData({
            ...valueData,
            code: `#${Math.floor(100000 + Math.random() * 900000)}`,
            descriptions: storeData?.supportedLanguages.map(({ code }) => {
                return {
                    language: code,
                    name: '',
                };
            }),
        }); // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeData]);

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
            {(loadCreateVariation || loadCreateValue) && <Loader />}
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

export default ColorsCreate;
