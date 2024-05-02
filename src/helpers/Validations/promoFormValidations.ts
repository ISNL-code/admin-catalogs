import * as yup from 'yup';

const promoFormValidations = yup.object().shape({
    descriptions: yup.array().of(
        yup.object().shape({
            name: yup.string().required('required_field'),
        })
    ),
    code: yup.string().required('required_field'),
});

export default promoFormValidations;
