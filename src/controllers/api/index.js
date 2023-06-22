import word from './../../models/word.js';
import wordList from './../../models/wordList.js';
import search from './../../models/search.js';
import label from './../../models/label.js';
import concept from './../../models/concepts.js';
import settings from './../../settings/index.js';

export default {
    // Words
    getWord: (req, res) => {
        const id = Number(req.params.id);

        if (!id) {
            res.render('404');
            return;
        }

        word.getItem(id).then((wordItem) => {
            if (word) {
                res.json(wordItem);
            } else {
                res.render('404');
            }
        }); //TODO catch(err)
    },

    getWordList: (req, res, lang) => {
        wordList.getList(lang).then((list) => {
            res.json(list);
        }); //TODO catch(err)
    },

    // Word search
    getSearch: (req, res) => {
        let text = req.query.text;

        if (!(text && typeof text === 'string')) {
            res.json([]);
            return;
        } else {
            text = text.substring(0, settings.WORD_MAX_LENGTH);
        }

        search.getList(text).then((result) => {
            res.json(result);
        }); //TODO catch(err)
    },

    // Labels
    getLabel: (req, res) => {
        const id = Number(req.params.id);

        if (id) {
            label.getItem(id).then((labelItem) => {
                res.json(labelItem);
            }); //TODO catch(err)
        } else {
            res.render('404');
        }
    },

    getLabelList: (req, res) => {
        label.getList().then((list) => {
            res.json(list);
        }); //TODO catch(err)
    },

    getLabelWords: (req, res, lang) => {
        const id = Number(req.params.id);

        if (!id) {
            res.render('404');
            return;
        }

        label.getWords(id, lang).then((list) => {
            res.json(list);
        }); //TODO catch(err)
    },

    // Concepts
    getConcept: (req, res) => {
        const id = Number(req.params.id);

        if (id) {
            concept.getItem(id).then((conceptItem) => {
                res.json(conceptItem);
            }); //TODO catch(err)
        } else {
            res.render('404');
        }
    },

    getConceptList: (req, res) => {
        concept.getList().then((list) => {
            res.json(list);
        }); //TODO catch(err)
    },

    getConceptWords: (req, res, lang) => {
        const id = Number(req.params.id);

        if (!id) {
            res.render('404');
            return;
        }

        concept.getWords(id, lang).then((list) => {
            res.json(list);
        }); //TODO catch(err)
    },
};
