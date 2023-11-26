import { CreateDataStore, EditDataStore, RetailerStoreInterface } from 'types';

export const passwordValidate = password => {
    if (password.length < 8) {
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    if (!/[a-z]/.test(password)) {
        return false;
    }
    if (!/[1-9]/.test(password)) {
        return false;
    } else return true;
};

export const validateCreateStore = (data: CreateDataStore | EditDataStore) => {
    const isValid =
        !!data.name &&
        !!data.code &&
        !!data.address.country &&
        !!data.currency &&
        !!data.inBusinessSince &&
        !!data.defaultLanguage &&
        !!data.supportedLanguages.length;

    return isValid;
};

export const validateCreateRetailer = (data: RetailerStoreInterface) => {
    const isValid =
        !!data.firstName &&
        !!data.lastName &&
        !!data.emailAddress &&
        !!data.repeatPassword &&
        data.repeatPassword === data.password &&
        !!passwordValidate(data.password);
    return isValid;
};

export const validateEditRetailer = (data: RetailerStoreInterface) => {
    const isValid = !!data.firstName && !!data.lastName && !!data.emailAddress;

    return isValid;
};
