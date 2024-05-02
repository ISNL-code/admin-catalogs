import * as yup from 'yup';

const hexRegex = /^#?([a-f0-9]{6}|[a-f0-9]{3})$/;

const colorFormValidations = yup.object().shape({
    code: yup.string().required('required_field').matches(hexRegex, 'input_correct_code'),
    descriptions: yup.array().of(
        yup.object().shape({
            name: yup.string().required('required_field'),
        })
    ),
});

export default colorFormValidations;
