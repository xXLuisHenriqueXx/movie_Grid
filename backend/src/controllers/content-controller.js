const database = require('../data/db');

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
    }

}



module.exports = contentController;