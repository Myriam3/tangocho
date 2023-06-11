import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import db from './db.js';
import indexRouter from './routes/index.js';
import wordsRouter from './routes/words.js';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

// Template engine
app.set('views', `${process.env.SRC_DIR_PATH}/views`);
app.set('view engine', 'ejs');

// Static paths
app.use(
    process.env.STATIC_PATH_PREFIX,
    express.static(path.resolve(process.env.STATIC_DIR_PATH))
);

// DB
// TODO: errors
db.createDBPool();

// Routes

app.use('/', indexRouter);
app.use('/words', wordsRouter);

// 404
app.use(function (req, res) {
    res.status(404).render('404');
});

// Server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
