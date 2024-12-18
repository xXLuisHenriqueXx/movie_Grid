const jwt = require('jsonwebtoken');

const cookieService = {
    createCookie(username, isAdmin) {
        const token = jwt.sign({ username: username, isAdmin: isAdmin }, 'PGDB', { expiresIn: '24h' });
        return token;
    },

    validateCookie(token) {
        try {
            const decoded = jwt.verify(token, 'PGDB');
            return { decoded: { username: decoded.username, isAdmin: decoded.isAdmin } };
        } catch (error) {
            return null;
        }
    },

    async validateTokenRoute (req, res) {
        if (!req.cookies || !req.cookies.token) {
            res.status(401).send({ success: false, message: 'no cookie' });
            return;
        }
    
        const cookie = req.cookies.token;
        const decodedCookie = cookieService.validateCookie(cookie);
    
        if (decodedCookie) {
            res.status(200).send({ success: true, message: 'valid cookie', isAdmin: decodedCookie.decoded.isAdmin });
        } else {
            res.status(401).send({ success: false, message: 'invalid cookie' });
        }
    },
    
    async logout(req, res) {
        res.clearCookie('token');
        res.status(200).send({ success: true, message: 'cookie cleared' });
    }
}

module.exports = cookieService;
