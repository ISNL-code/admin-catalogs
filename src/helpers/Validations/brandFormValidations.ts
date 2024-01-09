import * as yup from 'yup';

const langCheck = /^[a-zA-Z]+$/;

const brandFormValidations = yup.object().shape({
    descriptions: yup.array().of(
        yup.object().shape({
            description: yup.string().required('Обов`язкове поле'),
        })
    ),
    code: yup
        .string()
        .required('Обов`язкове поле')
        .matches(langCheck, 'Код має складатися щонайменше з латинських символів'),
});

export default brandFormValidations;
