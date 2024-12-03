import api from "./api";

const ContentService = {
    getAllMovies: async () => {
        try {
            const response = await api.get('/content/get/movies');

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllTVShows: async () => {
        try {
            const response = await api.get('/content/get/tvshows');

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllSoapOperas: async () => {
        try {
            const response = await api.get('/content/get/soapoperas');

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllTags: async () => {
        try {
            const response = await api.get('/content/get/tags');

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    getContentByTag: async (tag, type) => {
        try {
            const response = await api.get('/content/get/tags', { tag, type });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    createMovie: async (title, description, director, durationSeconds, ageRestriction, releaseYear, tag, image) => {
        try {
            const response = await api.post('/content/create/movie', { title, description, director, durationSeconds, ageRestriction, releaseYear, tag, image });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    createSoapOpera: async (title, description, producer, ageRestriction, releaseYear, tag, image) => {
        try {
            const response = await api.post('/content/create/series/soapopera', { title, description, producer, ageRestriction, releaseYear, tag, image });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    createTVShow: async (title, description, producer, ageRestriction, releaseYear, tag, image) => {
        try {
            const response = await api.post('/content/create/series/tvshow', { title, description, producer, ageRestriction, releaseYear, tag, image });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default ContentService;