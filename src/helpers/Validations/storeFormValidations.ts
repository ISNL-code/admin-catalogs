import * as yup from 'yup';

const storeFormValidations = yup.object().shape({
    name: yup.string().required('Обов`язкове поле'),
    code: yup.string().required('Обов`язкове поле'),
});

export default storeFormValidations;
