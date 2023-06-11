import wordList from './../../models/wordList.js';

export default (req, res, lang) => {
    wordList.getList(lang).then((list) => {
        let labels = [];
        let concepts = [];

        list.forEach((item) => {
            labels.push(...Array.from(item.labels));
            concepts.push(...Array.from(item.concepts));
        });

        labels = new Set(labels);
        concepts = new Set(concepts);

        res.render('words/list', {words: list, lang, labels, concepts});
    }); //TODO catch(err)
};
