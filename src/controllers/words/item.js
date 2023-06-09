const word = require('./../../models/word');

module.exports = (req, res) => {
    const data = word.getItem(req.params.id);

    res.render('words/item', {item: data});
};
