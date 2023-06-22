import db from './../db.js';

const queryLabelList = async () => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT id, name
            FROM labels`,
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

const queryLabel = async (id) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT id, name
            FROM labels
            WHERE labels.id = ?`,
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

const queryLabelWords = async (id, lang) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT words.id AS id,
            words.word AS word
            FROM words
            INNER JOIN word_label ON word_label.word = words.id
            INNER JOIN languages ON languages.id = words.language
            WHERE word_label.label = ? AND languages.name = ?`,
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
        const result = await queryLabel(id);

        return result;
    },

    getList: async () => {
        const result = await queryLabelList();

        return result;
    },

    getWords: async (id, lang) => {
        const result = await queryLabelWords(id, lang);

        return result;
    },
};
