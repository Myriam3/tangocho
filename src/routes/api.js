import express from 'express';
import settings from './../settings/index.js';
import apiController from './../controllers/api/index.js';

const router = express.Router();
const srcLang = settings.LANGUAGES.src;
const targetLang = settings.LANGUAGES.target;

// Word
router.get('/words/:id', (req, res) => {
    apiController.getWord(req, res);
});

// Word lists
router.get(`/words/${srcLang}`, (req, res) => {
    apiController.getList(req, res, srcLang);
});

router.get(`/words/${targetLang}`, (req, res) => {
    apiController.getWordList(req, res, `${targetLang}`);
});

// Word search
router.get('/words/search', (req, res) => {
    apiController.getSearch(req, res);
});

// Label
router.get('/labels/:id', (req, res) => {
    apiController.getLabel(req, res);
});

// Label list
router.get('/labels/', (req, res) => {
    apiController.getLabelList(req, res);
});

// Label word lists
router.get(`/labels/:id/${srcLang}`, (req, res) => {
    apiController.getLabelWords(req, res, srcLang);
});

router.get(`/labels/:id/${targetLang}`, (req, res) => {
    apiController.getLabelWords(req, res, targetLang);
});

// Concept
router.get('/concepts/:id', (req, res) => {
    apiController.getConcept(req, res);
});

// Concept list
router.get('/concepts/', (req, res) => {
    apiController.getConceptList(req, res);
});

// Concept word lists
router.get(`/concepts/:id/${srcLang}`, (req, res) => {
    apiController.getConceptWords(req, res, srcLang);
});

router.get(`/concepts/:id/${targetLang}`, (req, res) => {
    apiController.getConceptWords(req, res, targetLang);
});

export default router;
