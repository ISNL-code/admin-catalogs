import * as yup from 'yup';

const editUserFormValidations = yup.object().shape({
    firstName: yup.string().required('required_field'),
    lastName: yup.string().required('required_field'),
    emailAddress: yup.string().email('enter_valid_email').required('required_field'),
});

export default editUserFormValidations;
