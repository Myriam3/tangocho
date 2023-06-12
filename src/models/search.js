import db from './../db.js';

const querySearchWord = async (text) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();
        const substr = `%${text}%`;

        pool.query(
            `SELECT words.id AS id,
            languages.name AS lang,
            words.word AS word
            FROM words
            INNER JOIN languages ON words.language = languages.id
            WHERE words.word LIKE ? OR words.readings LIKE ?`,
            [substr, substr],
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
    getList: async (text) => {
        const result = await querySearchWord(text);

        return result;
    },
};
