import * as yup from 'yup';

const hexRegex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;

const colorFormValidations = yup.object().shape({
    code: yup.string().required('Обов`язкове поле').matches(hexRegex, 'Введiть коректний код'),
    descriptions: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Обов`язкове поле'),
        })
    ),
});

export default colorFormValidations;
