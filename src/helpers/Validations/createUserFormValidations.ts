import * as yup from 'yup';

const createUserFormValidations = yup.object().shape({
    firstName: yup.string().required('required_field'),
    lastName: yup.string().required('required_field'),
    emailAddress: yup.string().email('enter_valid_email').required('required_field'),
    password: yup
        .string()
        .required('required_field')
        .min(6, 'min_6_symbols')
        .max(12, 'max_12_symbols')
        .matches(/[a-zA-Z]/, 'code_latin_symbols')
        .test('passwords-match', 'min_1_number_uppercase', function (value) {
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
    repeatPassword: yup.string().test('passwords-match', 'passwords_do_not_match', function (value) {
        return this.parent.password === value;
    }),
});

export default createUserFormValidations;
