const word = require('./../../models/word');

module.exports = (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
        res.render('404');
    }

    word.getItem(id).then((word) => {
        if (word) {
            res.render('words/item', {item: word});
        } else {
            res.render('404');
        }
    }); //TODO catch(err)
};
