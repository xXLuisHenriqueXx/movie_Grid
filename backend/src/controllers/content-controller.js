const database = require('../data/db');
const cookieSerice = require('../services/cookie-service');

const contentController = {
    async getAllMovies(req, res) {
        const db = await database.openDatabase();

        let movies = await db.all('SELECT * FROM Movie');
        if (movies.length === 0) {
            return res.status(404).send({ succes: false, message: 'No movies found' });
        }
        movies = movies.map(movie => {
            movie.tags = db.all('SELECT tag FROM Tag WHERE contentID = ?', [movie.id]);
            movie.src = `posters/movies/${movie.title}.png`;
        });

        res.status(200).send({success: true, movies: movies});
    },
    async getAllTVShows(req, res) {
        const db = await database.openDatabase();

        let tvShows = await db.all('SELECT * FROM Sseries WHERE seriesType = "TVShow"');
        if (tvShows.length === 0) {
            return res.status(404).send({ succes: false, message: 'No TV Shows found' });
        }

        tvShows = tvShows.map(tvShow => {
            tvShow.tags = db.all('SELECT tag FROM Tag WHERE contentID = ?', [tvShow.id]);
            tvShow.src = `posters/series/${tvShow.title}.png`;
            tvShow.episodes = db.all('SELECT * FROM Episode WHERE contentID = ?', [tvShow.id]);
        });

        res.status(200).send({success: true, tvShows: tvShows});
    },

    async getAllSoapOperas(req, res) {
        const db = await database.openDatabase();

        let soapOperas = await db.all('SELECT * FROM Series WHERE seriesType = "SoapOpera"');
        if (soapOperas.length === 0) {
            return res.status(404).send({ succes: false, message: 'No Soap Operas found' });
        }

        soapOperas = soapOperas.map(soapOpera => {
            soapOpera.tags = db.all('SELECT tag FROM Tag WHERE contentID = ?', [soapOpera.id]);
            soapOpera.src = `posters/series/${soapOpera.title}.png`;
            soapOpera.episodes = db.all('SELECT * FROM Episode WHERE contentID = ?', [soapOpera.id]);
        });

        res.status(200).send({success: true, soapOperas: soapOperas});
    },

    async getContentByTag(req, res) {
        const {tag, type} = req.body;

        if (!tag) {
            return res.status(400).send({success: false, message: 'Missing parameters'});
        }

        const db = await database.openDatabase();

        let content = [];

        if (!type) {
            contnt = await db.all('SELECT * FROM Movie WHERE id IN (SELECT contentID FROM Tag WHERE tag = ?)', [tag]);
            content = content.concat(await db.all('SELECT * FROM Series WHERE id IN (SELECT contentID FROM Tag WHERE tag = ?)', [tag]));
        } else {
            content = await db.all(`SELECT * FROM ${type} WHERE id IN (SELECT contentID FROM Tag WHERE tag = ?)`, [tag]);
        }
        res.status(200).send({success: true, content: content});
    },

    async createMovie (req, res) {
        const cookie = req.cookies.token;
        const username = cookieSerice.validateCookie(cookie);

        if (!cookie || !username) {
            return res.status(401).send({success: false, message: 'Unauthorized'});
        }

        const db = await database.openDatabase();

        const isAdmin = await db.get('SELECT * FROM User WHERE username = ? and isAdmin = 1', [username]);
        if (!isAdmin) {
            return res.status(403).send({success: false, message: 'Forbidden'});
        }


        const {title, description, director, durationSeconds, ageRestriction ,releaseYear, tags, image} = req.body;
        const result = await db.run('INSERT INTO Movie (title, description, director, durationSeconds, ageRestriction, releaseYear) VALUES (?, ?, ?, ?)', [title, description, director, durationSeconds, ageRestriction, releaseYear]);

        tags.forEach(async tag => {
            await db.run('INSERT INTO Tag (contentID, tag) VALUES (?, ?)', [result.lastID, tag]);
        });

        if (result.changes === 0) {
            return res.status(500).send({success: false, message: 'Movie not created'});
        }

        if (image) {
            const base64Data = image.replace(/^data:image\/png;base64,/, '');
            require('fs').writeFileSync(`public/posters/movies/${title}.png`, base64Data, 'base64');
            res.status(201).send({success: true, message: 'Movie created and poster added'});
        }
        res.status(201).send({success: true, message: 'Movie created'});
    },

    async createTVShow(req, res) {
        createSeries(req, res, 'TVShow');
    },

    async createSoapOpera(req, res) {
        createSeries(req, res, 'SoapOpera');
    },
    
    async getAllTags (req, res) {
        const db = await database.openDatabase();
        const tags = await db.all('SELECT DISTINCT tag FROM Tag');
        if (tags.length === 0) {
            return res.status(404).send({success: false, message: 'No tags found'});
        }
        res.status(200).send({success: true, tags: tags});
    },
    async createEpisode(req, res) {
        const cookie = req.cookies.token;
        const username = cookieSerice.validateCookie(cookie);

        if (!cookie || !username) {
            return res.status(401).send({success: false, message: 'Unauthorized'});
        }

        const db = await database.openDatabase();

        const isAdmin = await db.get('SELECT * FROM User WHERE username = ? and isAdmin = 1', [username]);
        if (!isAdmin) {
            return res.status(403).send({success: false, message: 'Forbidden'});
        }

        const {title, description, durationSeconds, season, episodeNumber, contentID} = req.body;
        const result = await db.run('INSERT INTO Episode (title, description, durationSeconds, season, episodeNumber, contentID) VALUES (?, ?, ?, ?, ?, ?)', [title, description, durationSeconds, season, episodeNumber, contentID]);

        if (result.changes === 0) {
            return res.status(500).send({success: false, message: 'Episode not created'});
        }
        res.status(201).send({success: true, message: 'Episode created'});
    }
}

async function createSeries(req, res, type) {
    const cookie = req.cookies.token;
    const username = cookieSerice.validateCookie(cookie);

    if (!cookie || !username) {
        return res.status(401).send({success: false, message: 'Unauthorized'});
    }

    const db = await database.openDatabase();

    const isAdmin = await db.get('SELECT * FROM User WHERE username = ? and isAdmin = 1', [username]);
    if (!isAdmin) {
        return res.status(403).send({success: false, message: 'Forbidden'});
    }

    const {title, description, producer, ageRestriction, releaseYear, tags, image} = req.body;
    const result = await db.run('INSERT INTO Series (title, description, producer, ageRestriction, releaseYear, seriesType) VALUES (?, ?, ?, ?, ?, ?)', [title, description, producer, ageRestriction, releaseYear, type]);

    tags.forEach(async tag => {
        await db.run('INSERT INTO Tag (contentID, tag) VALUES (?, ?)', [result.lastID, tag]);
    });

    if (result.changes === 0) {
        return res.status(500).send({success: false, message: 'Series not created'});
    }

    if (image) {
        const base64Data = image.replace(/^data:image\/png;base64,/, '');
        require('fs').writeFileSync(`public/posters/series/${title}.png`, base64Data, 'base64');
        res.status(201).send({success: true, message: 'Series created and poster added'});
    }
    res.status(201).send({success: true, message: `${type} created`});
}


module.exports = contentController;