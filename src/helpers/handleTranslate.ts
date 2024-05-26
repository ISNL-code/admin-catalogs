const langGetOriginalCode = [
    { code: 'en', id: 1, name: 'English', original: 'en' },
    { code: 'fr', id: 2, name: 'French', original: 'fr' },
    { code: 'es', id: 3, name: 'Spain', original: 'es' },
    { code: 'ua', id: 4, name: 'Ukrainian', original: 'uk' },
    { code: 'ru', id: 5, name: 'Russian', original: 'ru' },
    { code: 'pl', id: 6, name: 'Polish', original: 'pl' },
    { code: 'cz', id: 7, name: 'Czech', original: 'cs' },
    { code: 'kz', id: 8, name: 'Kazakh', original: 'kk' },
    { code: 'it', id: 9, name: 'Italian', original: 'it' },
    { code: 'tk', id: 10, name: 'Turkish', original: 'tk' },
    { code: 'de', id: 11, name: 'Deutsche', original: 'de' },
    { code: 'fi', id: 11, name: 'Fin', original: 'fi' },
];

export const handleTranslate = async ({ data, rootLanguage, translateText, rootName, rootDescription, setAction }) => {
    if (!data?.descriptions) return;
    const translations = await Promise.all(
        data.descriptions.map(async item => {
            if (item?.language === rootLanguage) return item;

            const getOriginCode =
                langGetOriginalCode.find(el => el?.code === item?.language)?.original || item?.language;

            const nameTranslation = await translateText({ text: rootName, lang: getOriginCode });

            const descriptionTranslation = rootDescription
                ? await translateText({ text: rootDescription, lang: getOriginCode })
                : item?.description;

            return {
                ...item,
                name: nameTranslation.data.data.translations[0].translatedText,
                description: rootDescription
                    ? descriptionTranslation.data.data.translations[0].translatedText
                    : item?.description,
                friendlyUrl: nameTranslation.data.data.translations[0].translatedText,
                keyWords: nameTranslation.data.data.translations[0].translatedText,
                highlights: nameTranslation.data.data.translations[0].translatedText,
                metaDescription: nameTranslation.data.data.translations[0].translatedText,
                title: nameTranslation.data.data.translations[0].translatedText,
            };
        })
    );

    setAction({
        ...data,
        descriptions: translations,
    });
};
