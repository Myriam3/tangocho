const express = require('express');
const router = express.Router();
const wordController = require('./../controllers/words/item');
const wordListController = require('./../controllers/words/list');

router.get('/', (req, res) => {
    res.render('words/');
});

router.get('/en', (req, res) => {
    wordListController(req, res, 'en');
});

router.get('/ja', (req, res) => {
    wordListController(req, res, 'ja');
});

router.get('/:id', (req, res) => {
    wordController(req, res);
});

module.exports = router;
