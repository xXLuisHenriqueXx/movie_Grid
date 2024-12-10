const { log } = require('console');
const database = require('../data/db');
const cookieService = require('../services/cookie-service');
const logService = require('../services/log-service');

const contentController = {
    async getAllMovies(req, res) {
        const db = await database.openDatabase();

        // Verificar autenticação do usuário
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);
        let watchedMovies = new Set();
        let watchLaterMovies = new Set();

        if (auth) {
            const username = auth.decoded.username;
            const user = await db.get('SELECT id FROM User WHERE username = ?', [username]);

            if (user) {
                const watched = await db.all('SELECT movieID FROM UserWatchedContent WHERE userId = ? AND type = "Movie"', [user.id]);
                const watchLater = await db.all('SELECT movieID FROM UserWatchLater WHERE userId = ? AND type = "Movie"', [user.id]);

                watchedMovies = new Set(watched.map(item => item.movieID));
                watchLaterMovies = new Set(watchLater.map(item => item.movieID));
            }
        }

        let movies = await db.all('SELECT * FROM Movie');
        if (movies.length === 0) {
            logService.createLog('INFO', 'Listagem de filmes realizada | 0 filmes encontrados | Autenticado: ' + auth ? 'Sim' : 'Não');
            return res.status(404).send({ success: false, message: 'Nenhum filme encontrado' });
        }

        movies = await Promise.all(movies.map(async (movie) => {
            const tags = await db.all('SELECT tag FROM ContentTag WHERE movieID = ?', [movie.id]);

            return {
                ...movie,
                tags: tags.map(tag => tag.tag),
                src: `posters/movies/${movie.title}.png`,
                watched: auth ? (watchedMovies.has(movie.id) ? 1 : 0) : 0,
                watchlater: auth ? (watchLaterMovies.has(movie.id) ? 1 : 0) : 0
            };
        }));

        logService.createLog('INFO', 'Listagem de filmes realizada | ' + movies.length + ' filmes encontrados | ' + 'Autenticado: ' + auth ? 'Sim' : 'Não');
        res.status(200).send({ success: true, movies });
    },

    async getAllSeries(req, res, seriesType = null) {
        const db = await database.openDatabase();

        // Verificar autenticação do usuário
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);
        let watchedSeries = new Set();
        let watchLaterSeries = new Set();

        if (auth) {
            const username = auth.decoded.username;
            const user = await db.get('SELECT id FROM User WHERE username = ?', [username]);

            if (user) {
                const watched = await db.all('SELECT seriesID FROM UserWatchedContent WHERE userId = ? AND type = "Series"', [user.id]);
                const watchLater = await db.all('SELECT seriesID FROM UserWatchLater WHERE userId = ? AND type = "Series"', [user.id]);

                watchedSeries = new Set(watched.map(item => item.seriesID));
                watchLaterSeries = new Set(watchLater.map(item => item.seriesID));
            }
        }

        let query = 'SELECT * FROM Series';
        let params = [];
        if (seriesType) {
            query += ' WHERE seriesType = ?';
            params.push(seriesType);
        }

        let seriesList = await db.all(query, params);
        if (seriesList.length === 0) {
            logService.createLog('INFO', 'Listagem de seriados realizada' + (seriesType ? ` | Tipo: ${seriesType}` : '') + ` | 0 seriados encontrados | Autenticado: ${auth ? 'Sim' : 'Não'}`);
            const mensagem = seriesType === 'TVShow' ? 'Nenhum programa de TV encontrado' : 'Nenhuma novela encontrada';
            return res.status(404).send({ success: false, message: mensagem });
        }

        seriesList = await Promise.all(seriesList.map(async (series) => {
            const tags = await db.all('SELECT tag FROM ContentTag WHERE seriesID = ?', [series.id]);
            const episodes = await db.all('SELECT * FROM Episode WHERE seriesID = ?', [series.id]);

            return {
                ...series,
                tags: tags.map(tag => tag.tag),
                src: `posters/series/${series.title}.png`,
                episodes,
                watched: auth ? (watchedSeries.has(series.id) ? 1 : 0) : 0,
                watchlater: auth ? (watchLaterSeries.has(series.id) ? 1 : 0) : 0
            };
        }));

        const resposta = seriesType === 'TVShow' ? { tvShows: seriesList } : { soapOperas: seriesList };
        logService.createLog('INFO', 'Listagem de seriados realizada' + (seriesType ? ` | Tipo: ${seriesType}` : '') + ` | ${seriesList.length} seriados encontrados | Autenticado: ${auth ? 'Sim' : 'Não'}`);
        res.status(200).send({ success: true, ...resposta });
    },

    async getAllTVShows(req, res) {
        await contentController.getAllSeries(req, res, 'TVShow');
    },

    async getAllSoapOperas(req, res) {
        await contentController.getAllSeries(req, res, 'SoapOpera');
    },

    async getDailySchedule(req, res) {
        try {
            const { date } = req.body;
            if (!date) {
                res.status(200).send({ success: false, message: 'Requsest malformatado' });
            }

            const db = await database.openDatabase();
            const schedules = await db.all(`
                SELECT ds.*, 
                       m.title as movieTitle,
                       m.description as movieDescription,
                       m.director as movieDirector,
                       m.durationMinutes as movieDuration,
                       m.ageRestriction as movieAgeRestriction,
                       m.releaseYear as movieReleaseYear,

                       e.title as episodeTitle,
                       e.description as episodeDescription,
                       e.episodeNumber as episodeNumber,
                       e.season as episodeSeason,
                       e.durationMinutes as episodeDuration,
                       
                       s.title as seriesTitle,
                       s.producer as seriesProducer,
                       s.ageRestriction as seriesAgeRestriction,
                       s.releaseYear as seriesReleaseYear,
                       s.seriesType as seriesType

                FROM DailySchedule ds
                LEFT JOIN Movie m ON ds.movieID = m.id
                LEFT JOIN Episode e ON ds.episodeID = e.id
                LEFT JOIN Series s ON e.seriesID = s.id
                WHERE date = DATE(?)
                ORDER BY ds.startTime
            `, [date]);

            schedules.map(schedule => {
                if (schedule.contentType === 'Movie') {
                    return {
                        title: schedule.movieTitle,
                        description: schedule.movieDescription,
                        director: schedule.movieDirector,
                        durationMinutes: schedule.movieDuration,
                        ageRestriction: schedule.movieAgeRestriction,
                        releaseYear: schedule.movieReleaseYear,
                        contentType: 'Movie'
                    };
                } else if (schedule.contentType === 'Series') {
                    return {
                        title: schedule.seriesTitle + ': ' + schedule.episodeTitle,
                        description: schedule.episodeDescription,
                        durationMinutes: schedule.episodeDuration,
                        ageRestriction: schedule.seriesAgeRestriction,
                        releaseYear: schedule.seriesReleaseYear,
                        episodeNumber: schedule.episodeNumber,
                        season: schedule.episodeSeason,
                        seriesType: schedule.seriesType,
                        contentType: 'Series'
                    };
                }
            });

            const enrichedSchedules = schedules.map(schedule => {
                let src = '';
                if (schedule.contentType === 'Movie') {
                    src = `posters/movies/${schedule.movieTitle}.png`;
                } else if (schedule.contentType === 'Series') {
                    src = `posters/series/${schedule.seriesTitle}.png`;
                }
                return {
                    ...schedule,
                    src
                };
            });

            logService.createLog('INFO', 'Listagem de programação diária realizada' + ` | ${schedules.length} programações encontradas`);
            res.status(200).send({ success: true, schedules: enrichedSchedules });
        } catch (error) {
            console.log(error);
            res.status(500).send({ success: false, message: 'Erro interno do servidor' });
        }
    },
    async createDailySchedule(req, res) {
        try {
            const { date, startTime, endTime, contentType, movieID, episodeID } = req.body;

            if (!date || !startTime || !endTime || !contentType || (!movieID && !episodeID)) {
                res.status(400).send({ success: false, message: 'Request malformatado' });
            }

            const db = await database.openDatabase();
            const result = await db.run(`
                INSERT INTO DailySchedule (date, startTime, endTime, contentType, movieID, episodeID)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [date, startTime, endTime, contentType, movieID, episodeID]);

            if (result.changes === 0) {
                logService.createLog('ERROR', 'Erro ao criar programação diária: ' + date);
                res.status(500).send({ success: false, message: 'Erro ao criar programação diária' });
            }

            logService.createLog('INFO', 'Programação diária criada: ' + date, startTime, endTime, contentType, movieID, episodeID);
            res.status(201).send({ success: true, message: 'Programação criada' });

        } catch (error) {
            res.status(500).send({ success: false, message: 'Erro interno do servidor: ' + error });
        }
    },

    async getAllTags(req, res) {
        const db = await database.openDatabase();

        const tags = await db.all('SELECT DISTINCT tagname FROM Tags');
        
        logService.createLog('INFO', 'Listagem de tags realizada ' + ` | ${tags.length} tags encontradas`);
        res.status(200).send({ success: true, tags: tags.map(tag => tag.tagname) });
    },

    async getContentByTag(req, res) {
        const { tag, type } = req.body;

        if (!tag) {
            return res.status(400).send({ success: false, message: 'Parâmetros faltando' });
        }

        const db = await database.openDatabase();

        // Verificar autenticação do usuário
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);
        let watchedMovies = new Set();
        let watchLaterMovies = new Set();
        let watchedSeries = new Set();
        let watchLaterSeries = new Set();

        if (auth) {
            const username = auth.decoded.username;
            const user = await db.get('SELECT id FROM User WHERE username = ?', [username]);

            if (user) {
                const watchedM = await db.all('SELECT movieID FROM UserWatchedContent WHERE userId = ? AND type = "Movie"', [user.id]);
                const watchLaterM = await db.all('SELECT movieID FROM UserWatchLater WHERE userId = ? AND type = "Movie"', [user.id]);
                const watchedS = await db.all('SELECT seriesID FROM UserWatchedContent WHERE userId = ? AND type = "Series"', [user.id]);
                const watchLaterS = await db.all('SELECT seriesID FROM UserWatchLater WHERE userId = ? AND type = "Series"', [user.id]);

                watchedMovies = new Set(watchedM.map(item => item.movieID));
                watchLaterMovies = new Set(watchLaterM.map(item => item.movieID));
                watchedSeries = new Set(watchedS.map(item => item.seriesID));
                watchLaterSeries = new Set(watchLaterS.map(item => item.seriesID));
            }
        }

        let content = [];

        if (!type || type === 'Movie') {
            const movies = await db.all('SELECT * FROM Movie WHERE id IN (SELECT movieID FROM ContentTag WHERE tag = ?)', [tag]);
            const enrichedMovies = await Promise.all(movies.map(async (movie) => {
                const tags = await db.all('SELECT tag FROM ContentTag WHERE movieID = ?', [movie.id]);
                return {
                    ...movie,
                    tags: tags.map(tag => tag.tag),
                    src: `posters/movies/${movie.title}.png`,
                    watched: auth ? (watchedMovies.has(movie.id) ? 1 : 0) : 0,
                    watchlater: auth ? (watchLaterMovies.has(movie.id) ? 1 : 0) : 0
                };
            }));
            content = content.concat(enrichedMovies);
        }

        if (!type || type === 'Series') {
            const series = await db.all('SELECT * FROM Series WHERE id IN (SELECT seriesID FROM ContentTag WHERE tag = ?)', [tag]);
            const enrichedSeries = await Promise.all(series.map(async (series) => {
                const tags = await db.all('SELECT tag FROM ContentTag WHERE seriesID = ?', [series.id]);
                const episodes = await db.all('SELECT * FROM Episode WHERE seriesID = ?', [series.id]);

                return {
                    ...series,
                    tags: tags.map(tag => tag.tag),
                    src: `posters/series/${series.title}.png`,
                    episodes,
                    watched: auth ? (watchedSeries.has(series.id) ? 1 : 0) : 0,
                    watchlater: auth ? (watchLaterSeries.has(series.id) ? 1 : 0) : 0
                };
            }));
            content = content.concat(enrichedSeries);
        }

        logService.createLog('INFO', 'Listagem de conteúdo por tag realizada ' + ` | ${content.length} conteúdos encontrados` + ` | Tag: ${tag}` + ` | Tipo: ${type}`);
        res.status(200).send({ success: true, content });
    },

    async createMovie(req, res) {
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);

        if (!auth) {
            return res.status(401).send({ success: false, message: 'Não autorizado' });
        }

        const db = await database.openDatabase();

        const isAdmin = await db.get('SELECT * FROM User WHERE username = ? AND isAdmin = 1', [auth.decoded.username]);
        if (!isAdmin) {
            return res.status(403).send({ success: false, message: 'Proibido' });
        }

        const { title, description, director, durationMinutes, ageRestriction, releaseYear, tags = [], image } = req.body;
        const result = await db.run(
            'INSERT INTO Movie (title, description, director, durationMinutes, ageRestriction, releaseYear) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, director, durationMinutes, ageRestriction, releaseYear]
        );

        if (result.changes === 0) {
            return res.status(500).send({ success: false, message: 'Filme não criado' });
        }

        const movieID = result.lastID;
        for (const tag of tags) {
            await db.run('INSERT INTO ContentTag (movieID, tag) VALUES (?, ?)', [movieID, tag]);
        }

        if (image) {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
            require('fs').writeFileSync(`public/posters/movies/${title}.png`, base64Data, 'base64');
            logService.createLog('INFO', `Filme criado: ${title}, ${description}, ${director}, ${durationMinutes}, ${ageRestriction}, ${releaseYear}, ${'public/posters/movies/' + title + '.png'}`);
            return res.status(201).send({ success: true, message: 'Filme criado e pôster adicionado' });
        }

        logService.createLog('INFO', `Filme criado: ${title}, ${description}, ${director}, ${durationMinutes}, ${ageRestriction}, ${releaseYear}`);
        res.status(201).send({ success: true, message: 'Filme criado' });
    },

    async createSeries(req, res, type) {
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);

        if (!auth) {
            return res.status(401).send({ success: false, message: 'Não autorizado' });
        }

        const db = await database.openDatabase();

        const isAdmin = await db.get('SELECT * FROM User WHERE username = ? AND isAdmin = 1', [auth.decoded.username]);
        if (!isAdmin) {
            return res.status(403).send({ success: false, message: 'Proibido' });
        }

        const { title, description, producer, ageRestriction, releaseYear, tags = [], image } = req.body;
        const result = await db.run(
            'INSERT INTO Series (title, description, producer, ageRestriction, releaseYear, seriesType) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, producer, ageRestriction, releaseYear, type]
        );

        if (result.changes === 0) {
            return res.status(500).send({ success: false, message: 'Série não criada' });
        }

        const seriesID = result.lastID;
        for (const tag of tags) {
            await db.run('INSERT INTO ContentTag (seriesID, tag) VALUES (?, ?)', [seriesID, tag]);
        }

        if (image) {
            const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
            require('fs').writeFileSync(`public/posters/series/${title}.png`, base64Data, 'base64');
            logService.createLog('INFO', `Seriado do tipo ${type} criado: ${title}, ${description}, ${producer}, ${ageRestriction}, ${releaseYear}, ${'public/posters/series/' + title + '.png'}`);
            return res.status(201).send({ success: true, message: `${type} criada e pôster adicionado` });
        }

        logService.createLog('INFO', `Seriado do tipo ${type} criado: ${title}, ${description}, ${producer}, ${ageRestriction}, ${releaseYear}`);
        res.status(201).send({ success: true, message: `${type} criada` });
    },

    async createTVShow(req, res) {
        await contentController.createSeries(req, res, 'TVShow');
    },

    async createSoapOpera(req, res) {
        await contentController.createSeries(req, res, 'SoapOpera');
    },

    async createEpisode(req, res) {
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);

        if (!auth) {
            return res.status(401).send({ success: false, message: 'Não autorizado' });
        }

        const db = await database.openDatabase();

        const isAdmin = await db.get('SELECT * FROM User WHERE username = ? AND isAdmin = 1', [auth.decoded.username]);
        if (!isAdmin) {
            return res.status(403).send({ success: false, message: 'Não autorizado' });
        }

        const { title, description, durationMinutes, season, episodeNumber, seriesID } = req.body;
        const result = await db.run(
            'INSERT INTO Episode (title, description, durationMinutes, season, episodeNumber, seriesID) VALUES (?, ?, ?, ?, ?, ?)',
            [title, description, durationMinutes, season, episodeNumber, seriesID]
        );

        if (result.changes === 0) {
            logService.createLog('INFO', `Episódio não criado: ${title}, ${description}, ${durationMinutes}, ${season}, ${episodeNumber}, ${seriesID}`);
            return res.status(500).send({ success: false, message: 'Episódio não criado' });
        }


        logService.createLog('INFO', `Episódio criado: ${title}, ${description}, ${durationMinutes}, ${season}, ${episodeNumber}, ${seriesID}`);
        res.status(201).send({ success: true, message: 'Episódio criado' });
    },

    async createTag(req, res) {
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);

        if (!auth) {
            return res.status(401).send({ success: false, message: 'Não autorizado' });
        }

        const db = await database.openDatabase();

        const isAdmin = await db.get('SELECT * FROM User WHERE username = ? AND isAdmin = 1', [auth.decoded.username]);
        if (!isAdmin) {
            return res.status(403).send({ success: false, message: 'Não autorizado' });
        }

        const { tagname } = req.body;
        const result = await db.run('INSERT INTO Tags (tagname) VALUES (?)', [tagname]);

        if (result.changes === 0) {
            logService.createLog('INFO', `Tag não criada: ${tagname}`);
            return res.status(500).send({ success: false, message: 'Tag não criada' });
        }

        logService.createLog('INFO', `Tag criada: ${tagname}`);
        res.status(201).send({ success: true, message: 'Tag criada' });
    },

    async deleteMovie(req, res) {
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);

        if (!auth) {
            return res.status(401).send({ success: false, message: 'Não autorizado' });
        }

        const db = await database.openDatabase();

        const isAdmin = await db.get('SELECT * FROM User WHERE username = ? AND isAdmin = 1', [auth.decoded.username]);
        if (!isAdmin) {
            return res.status(403).send({ success: false, message: 'Não autorizado' });
        }

        const { movieID } = req.body;
        const result = await db.run('DELETE FROM Movie WHERE id = ?', [movieID]);

        if (result.changes === 0) {
            logService.createLog('INFO', `Filme não encontrado: ${movieID}`);
            return res.status(500).send({ success: false, message: 'Filme não encontrado' });
        }

        logService.createLog('INFO', `Filme deletado: ${movieID}`);
        res.status(200).send({ success: true, message: 'Filme deletado' });
    },

    async deleteSeries(req, res) {
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);

        if (!auth) {
            return res.status(401).send({ success: false, message: 'Não autorizado' });
        }

        const db = await database.openDatabase();

        const isAdmin = await db.get('SELECT * FROM User WHERE username = ? AND isAdmin = 1', [auth.decoded.username]);
        if (!isAdmin) {
            return res.status(403).send({ success: false, message: 'Não autorizado' });
        }

        const { seriesID } = req.body;
        const result = await db.run('DELETE FROM Series WHERE id = ?', [seriesID]);

        if (result.changes === 0) {
            logService.createLog('INFO', `Série não encontrada: ${seriesID}`);
            return res.status(500).send({ success: false, message: 'Série não encontrada' });
        }

        logService.createLog('INFO', `Série deletada: ${seriesID}`);
        res.status(200).send({ success: true, message: 'Série deletada' });
    },

    async deleteEpisode(req, res) {
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);

        if (!auth) {
            return res.status(401).send({ success: false, message: 'Não autorizado' });
        }

        const db = await database.openDatabase();

        const isAdmin = await db.get('SELECT * FROM User WHERE username = ? AND isAdmin = 1', [auth.decoded.username]);
        if (!isAdmin) {
            return res.status(403).send({ success: false, message: 'Não autorizado' });
        }

        const { episodeID } = req.body;
        const result = await db.run('DELETE FROM Episode WHERE id = ?', [episodeID]);

        if (result.changes === 0) {
            logService.createLog('INFO', `Episódio não encontrado: ${episodeID}`);
            return res.status(500).send({ success: false, message: 'Episódio não encontrado' });
        }

        logService.createLog('INFO', `Episódio deletado: ${episodeID}`);
        res.status(200).send({ success: true, message: 'Episódio deletado' });
    },

    async deleteTag(req, res) {
        const cookie = req.cookies.token;
        const auth = cookieService.validateCookie(cookie);

        if (!auth) {
            return res.status(401).send({ success: false, message: 'Não autorizado' });
        }

        const db = await database.openDatabase();

        const isAdmin = await db.get('SELECT * FROM User WHERE username = ? AND isAdmin = 1', [auth.decoded.username]);
        if (!isAdmin) {
            return res.status(403).send({ success: false, message: 'Não autorizado' });
        }

        const { tagname } = req.body;
        const result = await db.run('DELETE FROM Tags WHERE tagname = ?', [tagname]);

        if (result.changes === 0) {
            logService.createLog('INFO', `Tag não encontrada: ${tagname}`);
            return res.status(500).send({ success: false, message: 'Tag não encontrada' });
        }

        logService.createLog('INFO', `Tag deletada: ${tagname}`);
        res.status(200).send({ success: true, message: 'Tag deletada' });
    }
};

module.exports = contentController;