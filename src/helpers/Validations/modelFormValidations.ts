import * as yup from 'yup';

const modelFormValidations = yup.object().shape({
    sku: yup.string().required('Обов`язкове поле'),
    variation: yup.string().required('Обов`язкове поле'),
    sortOrder: yup.string().required('Обов`язкове поле'),
    inventory: yup.object().shape({
        price: yup.object().shape({
            price: yup.string().required('Обов`язкове поле'),
        }),
    }),
});

export default modelFormValidations;
