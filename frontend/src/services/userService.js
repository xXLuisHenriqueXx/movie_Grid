import api from './api';

const userService = {
    register: async (username, password) => {
        try {
            const response = await api.post('/user/register', { username, password });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    login: async (username, password) => {
        try {
            const response = await api.post('/user/login', { username, password });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    watchContent: async (contentID, type) => {
        try {
            const response = await api.post('/user/watch', { contentID, type });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    },

    watchLater: async (contentID, type) => {
        try {
            const response = await api.post('/user/watch/later');

            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default userService;