import api from "./api";

const ContentService = {
    getAllMovies: async () => {
        try {
            const response = await api.get('/api/content/get/movies');

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllTVShows: async () => {
        try {
            const response = await api.get('/api/content/get/tvshows');

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllSoapOperas: async () => {
        try {
            const response = await api.get('/api/content/get/soapoperas');

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    getDailySchedule: async (date) => {
        try {
            const response = await api.get('/api/content/get/daily', { date });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllTags: async () => {
        try {
            const response = await api.get('/api/content/get/tags');

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    getContentByTag: async (tag, type) => {
        try {
            const response = await api.get('/api/content/get/bytag', { tag, type });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    createMovie: async (title, description, director, durationMinutes, ageRestriction, releaseYear, tags, image) => {
        try {
            const response = await api.post('/api/content/create/movie', { title, description, director, durationMinutes, ageRestriction, releaseYear, tags, image });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    createSoapOpera: async (title, description, producer, ageRestriction, releaseYear, tags, image) => {
        try {
            const response = await api.post('/api/content/create/series/soapopera', { title, description, producer, ageRestriction, releaseYear, tags, image });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    createTVShow: async (title, description, producer, ageRestriction, releaseYear, tags, image) => {
        try {
            const response = await api.post('/api/content/create/series/tvshow', { title, description, producer, ageRestriction, releaseYear, tags, image });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    createEpisode: async (title, description, durationMinutes, season, episodeNumber, seriesID) => {
        try {
            const response = await api.post('/api/content/create/episode', { title, description, durationMinutes, season, episodeNumber, seriesID });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    createTag: async (tagname) => {
        try {
            const response = await api.post('/api/content/create/tag', { tagname });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    deleteMovie: async (movieID) => {
        try {
            const response = await api.post('/api/content/delete/movie', { movieID });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    deleteSeriesAndItsEpisodes: async (seriesID) => {
        try {
            const response = await api.post('/api/content/delete/series', { seriesID });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    deleteEpisode: async (episodeID) => {
        try {
            const response = await api.post('/api/content/delete/episode', { episodeID });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    deleteTag: async (tagname) => {
        try {
            const response = await api.post('/api/content/delete/tag', { tagname });

            return response;
        } catch (error) {
            throw new Error(error);    
        }
    }
};

export default ContentService;