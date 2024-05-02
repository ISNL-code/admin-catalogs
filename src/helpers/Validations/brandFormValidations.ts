import * as yup from 'yup';

const langCheck = /^[a-zA-Z]+$/;

const brandFormValidations = yup.object().shape({
    descriptions: yup.array().of(
        yup.object().shape({
            description: yup.string().required('required_field'),
        })
    ),
    code: yup.string().required('required_field').matches(langCheck, 'code_latin_symbols'),
});

export default brandFormValidations;
