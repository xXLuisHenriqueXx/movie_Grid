import api from './api';

const adminService = {
    login: async (username, password) => {
        try {
            const response = await api.post('/api/admin/login', { username, password });

            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default adminService;