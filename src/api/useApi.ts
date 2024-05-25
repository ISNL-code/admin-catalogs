import axios from 'axios';

// axios.defaults.baseURL = 'https://alberto-bini.com/api';

const useApi = () => {
    const get = async ({ url, body = {} }) => {
        const response = await axios.get(url, body);
        return response;
    };

    const post = async ({ url, body = {}, headers = {} }) => {
        const response = await axios.post(url, body);
        return response;
    };

    const put = async ({ url, body }) => {
        const response = await axios.put(url, body);
        return response;
    };

    const patch = async ({ url, body }) => {
        const response = await axios.patch(url, body);
        return response;
    };

    const remove = async ({ url }) => {
        const response = await axios.delete(url);
        return response;
    };

    return {
        get,
        post,
        put,
        remove,
        patch,
    };
};

export default useApi;
