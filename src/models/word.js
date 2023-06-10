const db = require('./../db.js');

const queryWord = async (id) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT words.id AS id,
            languages.name AS lang,
            words.word AS word,
            types.name AS type
            FROM words
            INNER JOIN types ON words.type = types.id
            INNER JOIN languages ON words.language = languages.id
            WHERE words.id = ?`,
            [Number(id)],
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

const queryWordTranslations = async (id, src) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();
        // TODO settings
        // TODO 3 languages
        const target = src === 'ja' ? 'en' : 'ja';

        pool.query(
            `SELECT words.id AS id,
            languages.name AS lang,
            words.word AS word
            FROM words
            INNER JOIN translations ON words.id = translations.${target}
            INNER JOIN languages ON words.language = languages.id
            WHERE translations.${src} = ?`,
            [Number(id)],
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

const queryWordLabels = async (id) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT labels.name AS label
            FROM word_label
            INNER JOIN labels ON labels.id = word_label.label
            WHERE word_label.word = ?`,
            [Number(id)],
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

const queryWordSentences = async (id) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT sentences.sentence AS sentence
            FROM word_sentence
            INNER JOIN sentences ON sentences.id = word_sentence.sentence
            WHERE word_sentence.word = ?`,
            [Number(id)],
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

const queryWordConcepts = async (id, lang) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT word_concept.concept AS id,
            concepts.name AS conceptName,
            concepts.parent_word_${lang} AS parentWordId,
            words.word AS parentWordName
            FROM word_concept
            INNER JOIN concepts ON word_concept.concept = concepts.id
            LEFT JOIN words ON concepts.parent_word_${lang} = words.id
            WHERE word_concept.word = ?`,
            [Number(id)],
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

// TODO concept.js model, API, front
const queryConceptWords = async (id, lang) => {
    const data = await new Promise((resolve, reject) => {
        const pool = db.getPool();

        pool.query(
            `SELECT words.id AS id,
            words.word AS word
            FROM words
            INNER JOIN word_concept ON word_concept.word = words.id
            INNER JOIN languages ON languages.id = words.language
            WHERE word_concept.concept = ? AND languages.name = '${lang}' `,
            [Number(id)],
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

module.exports = {
    getItem: async (id) => {
        const result = await queryWord(id);

        if (!result.length) {
            return null;
        }

        const wordItem = result[0];

        const labels = await queryWordLabels(id);
        wordItem.labels = labels.map((item) => item.label);

        wordItem.translations = await queryWordTranslations(id, wordItem.lang);

        const sentences = await queryWordSentences(id);
        wordItem.sentences = sentences.map((item) => item.sentence);

        const concepts = await queryWordConcepts(id, wordItem.lang);
        wordItem.concepts = concepts.map((concept) => {
            return {
                id: concept.id,
                name: concept.parentWordName || concept.conceptName,
                parent: concept.parentWordId,
                related: [],
            };
        });

        await Promise.all(
            wordItem.concepts.map(async (concept) => {
                if (concept.parent === id) {
                    concept.related = await queryConceptWords(
                        concept.id,
                        wordItem.lang
                    );
                }
            })
        );

        return wordItem;
    },
};
