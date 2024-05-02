import * as yup from 'yup';

const codeCheck = /^[a-zA-Z0-9]+$/;

const sizeFormValidations = yup.object().shape({
    descriptions: yup.array().of(
        yup.object().shape({
            name: yup.string().required('required_field'),
        })
    ),
    code: yup.string().required('required_field').matches(codeCheck, 'code_latin_symbols_numbers'),
});

export default sizeFormValidations;
