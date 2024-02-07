import * as yup from 'yup';

const langCheck = /^[a-zA-Z0-9]+$/;

const categoryFormValidations = yup.object().shape({
    descriptions: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Обов`язкове поле'),
        })
    ),
    code: yup
        .string()
        .required('Обов`язкове поле')
        .matches(langCheck, 'Код має складатися щонайменше з 3 латинських символів або цифр')
        .min(3, 'Код має складатися щонайменше з 3 латинських символів або цифр'),
});

export default categoryFormValidations;
