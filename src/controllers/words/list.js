const wordList = require('./../../models/wordList');

module.exports = (req, res, lang) => {
    // if (!(req.params.lang === 'en' || req.params.lang === 'ja')) {
    //     res.render('404');
    // }

    const data = wordList.getList(lang);

    res.render('words/list', {words: data, lang});
};
