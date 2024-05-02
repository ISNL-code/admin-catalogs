import * as yup from 'yup';

const productFormValidations = yup.object().shape({
    manufacturer: yup.string().required('required_field'),
    price: yup.string().required('required_field'),
    sortOrder: yup.string().required('required_field'),
    descriptions: yup.array().of(
        yup.object().shape({
            description: yup.string().required('required_field'),
            name: yup.string().required('required_field').max(60, 'max_60_symbols'),
        })
    ),
});

export default productFormValidations;
