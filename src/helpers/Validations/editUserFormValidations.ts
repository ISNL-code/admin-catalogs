import * as yup from 'yup';

const editUserFormValidations = yup.object().shape({
    firstName: yup.string().required('Обов`язкове поле'),
    lastName: yup.string().required('Обов`язкове поле'),
    emailAddress: yup.string().email('Введiть коректну почту').required('Обов`язкове поле'),
});

export default editUserFormValidations;
