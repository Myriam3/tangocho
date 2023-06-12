import word from './../../models/word.js';
import wordList from './../../models/wordList.js';
import search from './../../models/search.js';
import settings from './../../settings/index.js';

export default {
    getWord: (req, res) => {
        const id = Number(req.params.id);

        if (!id) {
            res.render('404');
            return;
        }

        word.getItem(id).then((word) => {
            if (word) {
                res.json(word);
            } else {
                res.render('404');
            }
        }); //TODO catch(err)
    },

    getList: (req, res, lang) => {
        wordList.getList(lang).then((list) => {
            res.json(list);
        }); //TODO catch(err)
    },

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
};
