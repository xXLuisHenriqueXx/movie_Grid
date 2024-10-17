const express = require('express');
const router = express.Router();

//Controllers
const adminController = require('./controllers/admin-controller');
const userController = require('./controllers/user-controller');
const cookieService = require('./services/cookie-service');

//rota de páginas da aplicação
router.get('/', (req, res) => {
    res.send(`░░░░█─────────────█▀─▀──<br>
░░░░▓█───────▄▄▀▀█──────<br>
░░░░▒░█────▄█▒░░▄░█─────<br>
░░░░░░░▀▄─▄▀▒▀▀▀▄▄▀─────<br>
░░░░░░░░░█▒░░░░▄▀───────<br>
▒▒▒░░░░▄▀▒░░░░▄▀────────<br>
▓▓▓▓▒░█▒░░░░░█▄─────────<br>
█████▀▒░░░░░█░▀▄────────<br>
█████▒▒░░░▒█░░░▀▄───────<br>
███▓▓▒▒▒▀▀▀█▄░░░░█──────<br>
▓██▓▒▒▒▒▒▒▒▒▒█░░░░█─────<br>
▓▓█▓▒▒▒▒▒▒▓▒▒█░░░░░█────<br>
░▒▒▀▀▄▄▄▄█▄▄▀░░░░░░░█───`);
});


//rotas de admin
router.post('/admin/login', adminController.login);
router.post('/admin/register', adminController.register);

//rotas de usuário
router.post('/user/login', userController.login);
router.post('/user/register', userController.register);

//rotas sem autenticação


//rotas para validação de token
router.get('/validate/token', cookieService.validateTokenRoute);

module.exports = router;