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
router.post('/admin/login', adminController.login);
router.post('/admin/register', adminController.register);

//rotas de usuário
router.post('/user/login', userController.login);
router.post('/user/register', userController.register);
router.post('/user/watch', userController.watchContent);
router.post('/user/watch/later', userController.watchLater);

//rotas sem autenticação para recuperar conteúdo
router.get('/content/get/movies', contentController.getAllMovies);
router.get('/content/get/tvshows', contentController.getAllTVShows);
router.get('/content/get/soapoperas', contentController.getAllSoapOperas);
router.get('/content/get/tags', contentController.getAllTags);
router.get('/content/get/bytag', contentController.getContentByTag);

//rotas para validação de token
router.get('/validate/token', cookieService.validateTokenRoute);

//rota para logout
router.post('/logout', cookieService.logout);

//rotas de conteúdo que necessitam de autenticação
router.post('/content/create/movie', contentController.createMovie);
router.post('/content/create/series/soapopera', contentController.createSoapOpera);
router.post('/content/create/series/tvshow', contentController.createTVShow);

module.exports = router;