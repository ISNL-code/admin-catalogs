import * as yup from 'yup';

const storeFormValidations = yup.object().shape({
    name: yup.string().required('required_field'),
    code: yup.string().required('required_field'),
});

export default storeFormValidations;
