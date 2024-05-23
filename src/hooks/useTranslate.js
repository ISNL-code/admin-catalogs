import axios from 'axios';
import toast from 'react-hot-toast';

const useTranslate = () => {
    function translateText(text, targetLang) {
        let translatedText = '';
        const apiKey = 'AIzaSyBAbqka5_7RSDIXBbBJze1zSKtHKaF4Drk'; // Замените на ваш ключ API
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

        const data = {
            q: text,
            target: targetLang,
        };

        axios
            .post(url, data)
            .then(response => {
                translatedText = response.data.data.translations[0].translatedText;
            })
            .catch(_ => toast.error('Translation Error'));

        return translatedText;
    }

    return { translateText };
};

export default useTranslate;
