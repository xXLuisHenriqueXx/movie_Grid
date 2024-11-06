const express = require('express');
const router = express.Router();

//Controllers
const adminController = require('./controllers/admin-controller');
const userController = require('./controllers/user-controller');
const cookieService = require('./services/cookie-service');
const contentController = require('./controllers/content-controller');
const path = require('path');

//rota de páginas da aplicação
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

//rotas de admin
router.post('api/admin/login', adminController.login);
router.post('api/admin/register', adminController.register);

//rotas de usuário
router.post('api/user/login', userController.login);
router.post('api/user/register', userController.register);
router.post('api/user/watch', userController.watchContent);
router.post('api/user/watch/later', userController.watchLater);

//rotas sem autenticação para recuperar conteúdo
router.get('api/content/get/movies', contentController.getAllMovies);
router.get('api/content/get/tvshows', contentController.getAllTVShows);
router.get('api/content/get/soapoperas', contentController.getAllSoapOperas);
router.get('api/content/get/tags', contentController.getAllTags);

//rotas para validação de token
router.get('api/validate/token', cookieService.validateTokenRoute);

//rota para logout
router.post('api/logout', cookieService.logout);

//rotas de conteúdo que necessitam de autenticação
router.post('api/content/create/movie', contentController.createMovie);
router.post('api/content/create/series/soapopera', contentController.createSoapOpera);
router.post('api/content/create/series/tvshow', contentController.createTVShow);

module.exports = router;