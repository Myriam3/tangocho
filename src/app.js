const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 3000;
const indexRouter = require('./routes/index');

app.set('views', process.env.VIEWS_DIR_PATH);
app.set('view engine', 'ejs');

app.use(process.env.STATIC_PATH_PREFIX, express.static(path.resolve(process.env.STATIC_DIR_PATH)));
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
