const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 3000;
const indexRouter = require('./routes/index');
const wordsRouter = require('./routes/words');
var mysql = require('mysql');

// Database
// TODO: connexion errors
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.PSWD,
    database: process.env.NAME,
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

// Template engine
app.set('views', process.env.VIEWS_DIR_PATH);
app.set('view engine', 'ejs');

// Static paths
app.use(
    process.env.STATIC_PATH_PREFIX,
    express.static(path.resolve(process.env.STATIC_DIR_PATH))
);

// // Routes
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
