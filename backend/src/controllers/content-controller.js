const database = require('../data/db');
const cookieSerice = require('../services/cookie-service');

const contentController = {
    async getAllMovies(req, res) {
        const db = await database.openDatabase();

        const movies = await db.all('SELECT * FROM Movie');
        if (movies.length === 0) {
            return res.status(404).send({ succes: false, message: 'No movies found' });
        }
        res.status(200).send({success: true, movies: movies});
    },
    async getAllTVShows(req, res) {
        const db = await database.openDatabase();

        const tvShows = await db.all('SELECT * FROM Sseries WHERE seriesType = "TVShow"');
        if (tvShows.length === 0) {
            return res.status(404).send({ succes: false, message: 'No TV Shows found' });
        }
        res.status(200).send({success: true, tvShows: tvShows});
    },

    async getAllSoapOperas(req, res) {
        const db = await database.openDatabase();

        const soapOperas = await db.all('SELECT * FROM Series WHERE seriesType = "SoapOpera"');
        if (soapOperas.length === 0) {
            return res.status(404).send({ succes: false, message: 'No Soap Operas found' });
        }
        res.status(200).send({success: true, soapOperas: soapOperas});
    },

    async getAllEpisodesByContentID (req, res) {
        const db = await database.openDatabase();
        const {id} = req.params;
        const episodes = await db.all('SELECT * FROM Episode WHERE contentID = ?', [id]);
        const episodesBySeason = episodes.reduce((acc, episode) => {
            if (!acc[episode.season]) {
            acc[episode.season] = [];
            }
            acc[episode.season].push(episode);
            return acc;
        }, {});
        const episodesArray = Object.keys(episodesBySeason).map(season => ({
            season: season,
            episodes: episodesBySeason[season]
        }));
        if (episodes.length === 0) {
            return res.status(404).send({ success: false, message: 'No episodes found' });
        }
        res.status(200).send({success: true, episodes: episodes});
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