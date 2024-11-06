const express = require('express');
const { initDatabase } = require('./data/db');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', routes);  // prefixo para rotas de API
app.use(express.static(path.join(__dirname, '../../frontend/dist/')));

// Adicione esta rota "catch-all" após o middleware de rotas
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

initDatabase();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
