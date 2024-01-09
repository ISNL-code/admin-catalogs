import * as yup from 'yup';

const createUserFormValidations = yup.object().shape({
    firstName: yup.string().required('Обов`язкове поле'),
    lastName: yup.string().required('Обов`язкове поле'),
    emailAddress: yup.string().email('Введiть коректну почту').required('Обов`язкове поле'),
    password: yup
        .string()
        .required('Обов`язкове поле')
        .min(6, 'Мiнiмум 6 символiв')
        .max(12, 'Максимум 12 символiв')
        .matches(/[a-zA-Z]/, 'Тiльки латинськi букви')
        .test('passwords-match', 'Мiнiмум 1 цифра 1 велика буква', function (value) {
            let isStrong = true;

            if (!/[a-z]/.test(String(value))) {
                isStrong = false;
            }

            if (!/[A-Z]/.test(String(value))) {
                isStrong = false;
            }

            if (!/\d/.test(String(value))) {
                isStrong = false;
            }

            return isStrong;
        }),
    repeatPassword: yup.string().test('passwords-match', 'Паролi не збiгаються', function (value) {
        return this.parent.password === value;
    }),
});

export default createUserFormValidations;
