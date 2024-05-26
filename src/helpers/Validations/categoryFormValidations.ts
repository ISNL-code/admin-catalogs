import * as yup from 'yup';

const langCheck = /^[a-zA-Z0-9_-]+$/;

const categoryFormValidations = yup.object().shape({
    descriptions: yup.array().of(
        yup.object().shape({
            name: yup.string().required('required_field'),
        })
    ),
    code: yup
        .string()
        .required('required_field')
        .matches(langCheck, 'code_3_latin_symbols')
        .min(3, 'code_3_latin_symbols'),
});

export default categoryFormValidations;
