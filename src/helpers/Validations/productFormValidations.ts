import * as yup from 'yup';

const productFormValidations = yup.object().shape({
    manufacturer: yup.string().required('Обов`язкове поле'),
    price: yup.string().required('Обов`язкове поле'),
    sortOrder: yup.string().required('Обов`язкове поле'),
    descriptions: yup.array().of(
        yup.object().shape({
            description: yup.string().required('Обов`язкове поле'),
            name: yup.string().required('Обов`язкове поле').max(60, 'Максимально 60 символiв'),
        })
    ),
});

export default productFormValidations;
