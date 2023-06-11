import express from 'express';
import wordController from './../controllers/words/item.js';
import wordListController from './../controllers/words/list.js';

const router = express.Router();

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

export default router;
