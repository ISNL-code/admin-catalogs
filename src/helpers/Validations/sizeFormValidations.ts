import * as yup from 'yup';

const codeCheck = /^[a-zA-Z0-9]+$/;

const sizeFormValidations = yup.object().shape({
    descriptions: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Обов`язкове поле'),
        })
    ),
    code: yup
        .string()
        .required('Обов`язкове поле')
        .matches(codeCheck, 'Код має складатися з латинських символів aбо цифр'),
});

export default sizeFormValidations;
