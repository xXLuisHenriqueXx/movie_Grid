const jwt = require('jsonwebtoken');

const cookieService = {
    createCookie: (username) => {
        const token = jwt.sign({ username: username }, 'PGDB', { expiresIn: '24h' });
        return token;
    },

    validateCookie: (token) => {
        try {
            const decoded = jwt.verify(token, 'PGDB');
            return decoded.username;
        } catch (error) {
            return null;
        }
    },

    validateTokenRoute: async (req, res) => {
        if (!req.cookies || !req.cookies.token) {
            res.status(401).send({ success: false, message: 'no cookie' });
            return;
        }

        const cookie = req.cookies.token;

        if (cookieService.validateCookie(cookie)) {
            res.status(200).send({ success: true, message: 'valid cookie' })
        } else {
            res.status(401).send({ success: false, message: 'invalid cookie' })
        }
    }
}

module.exports = cookieService;
