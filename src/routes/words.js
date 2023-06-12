import express from 'express';
import settings from './../settings/index.js';
import wordController from './../controllers/words/item.js';
import wordListController from './../controllers/words/list.js';

const router = express.Router();
const srcLang = settings.LANGUAGES.src;
const targetLang = settings.LANGUAGES.target;

router.get('/', (req, res) => {
    res.render('words/');
});

router.get(`/${srcLang}`, (req, res) => {
    wordListController(req, res, srcLang);
});

router.get(`/${targetLang}`, (req, res) => {
    wordListController(req, res, `${targetLang}`);
});

router.get('/:id', (req, res) => {
    wordController(req, res);
});

export default router;
