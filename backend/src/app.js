const express = require('express');
const { initDatabase } = require('./data/db');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../../frontend/dist/')));


initDatabase();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});