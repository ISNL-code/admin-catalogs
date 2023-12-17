import * as yup from 'yup';

const promoFormValidations = yup.object().shape({
    descriptions: yup.array().of(
        yup.object().shape({
            name: yup.string().required('Обов`язкове поле'),
        })
    ),
    code: yup.string().required('Обов`язкове поле'),
});

export default promoFormValidations;
