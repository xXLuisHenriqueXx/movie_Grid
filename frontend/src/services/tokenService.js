import api from "./api";

const tokenService = {
    validateTokenRoute: async () => {
        try {
            const response = await api.get('/api/validate/token');
        
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
};

export default tokenService;