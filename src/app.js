const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 3000;
const indexRouter = require('./routes/index');
const wordsRouter = require('./routes/words');
const db = require('./db.js');

// Template engine
app.set('views', `${process.env.SRC_DIR_PATH}/views`);
app.set('view engine', 'ejs');

// Static paths
app.use(
    process.env.STATIC_PATH_PREFIX,
    express.static(path.resolve(process.env.STATIC_DIR_PATH))
);

// DB
// TODO: erros
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
