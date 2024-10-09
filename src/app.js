const express = require('express');
const { initDatabase } = require('./config/db');

const app = express();

initDatabase();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});