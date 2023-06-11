import db from './../db.js';

const queryWordList = async (src) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT words.id AS id,
            languages.name AS lang,
            words.word AS word,
            labels.name AS label,
            concepts.name AS concept
            FROM words
            INNER JOIN languages ON languages.id = words.language
            LEFT JOIN word_label ON word_label.word = words.id
            LEFT JOIN labels ON labels.id = word_label.label
            LEFT JOIN word_concept ON word_concept.word = words.id
            LEFT JOIN concepts ON concepts.id = word_concept.concept
            WHERE languages.name = '${src}'
            ORDER BY words.word`,
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
    getList: async (srcLang) => {
        const result = await queryWordList(srcLang);

        const data = result.reduce((list, current) => {
            let wordItem = null;

            wordItem = list.find((item) => item && item.id === current.id);

            if (!wordItem) {
                wordItem = {
                    id: current.id,
                    lang: current.lang,
                    word: current.word,
                    labels: new Set(),
                    concepts: new Set(),
                };

                list.push(wordItem);
            }

            if (current.label) {
                wordItem.labels.add(current.label);
            }

            if (current.concept) {
                wordItem.concepts.add(current.concept);
            }

            return list;
        }, []);

        return data;
    },
};
