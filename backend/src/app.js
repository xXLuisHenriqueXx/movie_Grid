const express = require('express');
const { initDatabase } = require('./data/db');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const logService = require('./services/log-service');
const { log } = require('console');

const app = express();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json({ limit: '50mb' })); // Aumenta o limite do payload para 50MB
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Aumenta o limite do payload para 50MB
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
// app.use(cors({
//     origin: (origin, callback) => {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true
// }));
// app.options('*', cors());

app.use('/api', routes);  // prefixo para rotas de API
app.use(express.static(path.join(__dirname, '../../frontend/dist/')));

// Adicione esta rota "catch-all" após o middleware de rotas
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});


initDatabase();

app.listen(3000, () => {
    logService.createLog('INFO', 'Server is running on port 3000');
    console.log('Server is running on port 3000');
});
