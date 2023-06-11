import word from './../../models/word.js';

export default (req, res) => {
    const id = Number(req.params.id);

    if (!id) {
        res.render('404');
        return;
    }

    word.getItem(id).then((word) => {
        if (word) {
            res.render('words/item', {item: word});
        } else {
            res.render('404');
        }
    }); //TODO catch(err)
};
