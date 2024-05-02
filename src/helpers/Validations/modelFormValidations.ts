import * as yup from 'yup';

const modelFormValidations = yup.object().shape({
    sku: yup.string().required('required_field'),
    variation: yup.string().required('required_field'),
    sortOrder: yup.string().required('required_field'),
    inventory: yup.object().shape({
        price: yup.object().shape({
            price: yup.string().required('required_field'),
        }),
    }),
});

export default modelFormValidations;
