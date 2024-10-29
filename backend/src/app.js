const express = require('express');
const { initDatabase } = require('./data/db');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.json());
app.use(routes);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


initDatabase();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});