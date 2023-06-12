import express from 'express';
import settings from './../settings/index.js';
import apiController from './../controllers/api/index.js';

const router = express.Router();
const srcLang = settings.LANGUAGES.src;
const targetLang = settings.LANGUAGES.target;

router.get(`/words/${srcLang}`, (req, res) => {
    apiController.getList(req, res, srcLang);
});

router.get(`/words/${targetLang}`, (req, res) => {
    apiController.getList(req, res, `${targetLang}`);
});

router.get('/words/search', (req, res) => {
    apiController.getSearch(req, res);
});

router.get('/words/:id', (req, res) => {
    apiController.getWord(req, res);
});

export default router;
