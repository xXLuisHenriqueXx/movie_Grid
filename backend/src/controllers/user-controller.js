const bcrypt = require('bcrypt');
const db = require('../data/db');

const userController = {

    async register(req, res) {
        const { username, password } = req.body;
        const db = await openDatabase();

        const user = await db.get('SELECT * FROM User WHERE username = ?', [username]);

        if (user) {
            return res.status(400).send({ success: false, error: 'User already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        try {
            await db.run('INSERT INTO User (username, password) VALUES (?, ?)', [username, hashedPassword]);

            res.status(201).send({ success: true, message: 'User registered' });
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    },

    async login(req, res) {
        const { username, password } = req.body;
        const db = await openDatabase();

        const user = await db.get('SELECT * FROM User WHERE username = ?', [username]);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({ success: false, error: 'Invalid username or password' });
        }

        res.cookie('token', createCookie(username), { httpOnly: true });

        res.status(200).send({ success: false, message: 'User logged in' });
    },

    async watchContent(req, res) {
        const cookie = req.cookies.token;
        const username = cookieService.validateCookie(cookie);

        if (!cookie || !username) {
            return res.status(401).send({ success: false, message: 'Unauthorized' });
        }

        const { contentID, type} = req.body;
        const db = await openDatabase();

        if (type === 'Movie') {
            const result = await db.run('INSERT INTO WatchedContent (username, movieId) VALUES (?, ?)', [username, contentID]);

            if (result.changes === 0) {
                return res.status(500).send({ success: false, message: 'Content not watched' });
            }

            return res.status(201).send({ success: true, message: 'Content watched' });
        } else if (type === 'Series') {
            const result = await db.run('INSERT INTO WatchedContent (username, episodeId, season) VALUES (?, ?, ?)', [username, contentID]);

            if (result.changes === 0) {
                return res.status(500).send({ success: false, message: 'Content not watched' });
            }

            return res.status(201).send({ success: true, message: 'Content watched' });
        }
    },

    async watchLater(req, res) {
        const cookie = req.cookies.token;
        const username = cookieService.validateCookie(cookie);

        if (!cookie || !username) {
            return res.status(401).send({ success: false, message: 'Unauthorized' });
        }

        const { contentID, type} = req.body;
        const db = await openDatabase();

        if (type === 'Movie') {
            const result = await db.run('INSERT INTO WatchLater (username, contentId, type) VALUES (?, ?)', [username, contentID, type]);

            if (result.changes === 0) {
                return res.status(500).send({ success: false, message: 'Content not added to watch later' });
            }

            return res.status(201).send({ success: true, message: 'Content added to watch later' });
        } else if (type === 'Series') {
            const result = await db.run('INSERT INTO WatchLater (username, contentId, type) VALUES (?, ?, ?)', [username, contentID, type]);

            if (result.changes === 0) {
                return res.status(500).send({ success: false, message: 'Content not added to watch later' });
            }

            return res.status(201).send({ success: true, message: 'Content added to watch later' });
        }
    }
}

module.exports = userController;