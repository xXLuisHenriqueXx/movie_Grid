const express = require('express');
const { initDatabase } = require('./data/db');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.options('*', cors());
app.use('/api', routes);  // prefixo para rotas de API

initDatabase();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
