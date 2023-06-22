import db from './../db.js';
import settings from './../settings/index.js';
const srcLang = settings.LANGUAGES.src;
const targetLang = settings.LANGUAGES.target;

const queryConceptList = async () => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT id, name
            FROM concepts`,
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });

    return data;
};

const queryConcept = async (id) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT id,
            name,
            parent_word_${srcLang} AS ${srcLang},
            parent_word_${targetLang} AS ${targetLang}
            FROM concepts
            WHERE concepts.id = ?`,
            [id],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });

    return data;
};

const queryConceptWords = async (id, lang) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT words.id AS id,
            words.word AS word,
            concepts.parent_word_${lang} AS conceptParent
            FROM words
            INNER JOIN word_concept ON word_concept.word = words.id
            INNER JOIN concepts ON concepts.id = word_concept.concept
            INNER JOIN languages ON languages.id = words.language
            WHERE word_concept.concept = ? AND languages.name = ?`,
            [id, lang],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });

    return data;
};

export default {
    getItem: async (id) => {
        const result = await queryConcept(id);
        const item = result[0];

        if (!item) {
            return null;
        }

        const concept = {
            id: item.id,
            name: item.name,
            parentWord: {
                [srcLang]: item[srcLang],
                [targetLang]: item[targetLang],
            },
        };

        return concept;
    },

    getList: async () => {
        const result = await queryConceptList();

        return result;
    },

    getWords: async (id, lang) => {
        const result = await queryConceptWords(id, lang);

        return result;
    },
};
