import settings from './../settings/index.js';

export default {
    getTargetLanguage: (src) => {
        return src === settings.LANGUAGES.src
            ? settings.LANGUAGES.target
            : settings.LANGUAGES.src;
    },
};
