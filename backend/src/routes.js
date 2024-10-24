const express = require('express');
const router = express.Router();

//Controllers
const adminController = require('./controllers/admin-controller');
const userController = require('./controllers/user-controller');
const cookieService = require('./services/cookie-service');
const contentController = require('./controllers/content-controller');

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

//rotas sem autenticação para recuperar conteúdo
router.get('/content/movies', contentController.getAllMovies);
router.get('/content/tvshows', contentController.getAllTVShows);
router.get('/content/soapoperas', contentController.getAllSoapOperas);

//rotas para validação de token
router.get('/validate/token', cookieService.validateTokenRoute);

module.exports = router;