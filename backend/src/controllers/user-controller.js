const bcrypt = require('bcrypt');
const { openDatabase } = require('../data/db');
const { createCookie, validateCookie } = require('../services/cookie-service');

const userController = {

    async register(req, res) {
        const { username, password } = req.body;
        const db = await openDatabase();

        const user = await db.get('SELECT * FROM User WHERE username = ? and isAdmin = 0', [username]);

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
        try {
            const { username, password } = req.body;
            const db = await openDatabase();

            const user = await db.get('SELECT * FROM User WHERE username = ? AND isAdmin = 0', [username]);

            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).send({ success: false, error: 'Invalid username or password' });
            }

            res.cookie('token', createCookie(username, false), { httpOnly: true });

            res.status(200).send({ success: true, message: 'User logged in' });
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        };
    },

    async watchContent(req, res) {
        const cookie = req.cookies.token;
        const username = validateCookie(cookie);

        if (!cookie || !username) {
            return res.status(401).send({ success: false, message: 'Unauthorized' });
        }

        const { contentID, type} = req.body;
        const db = await openDatabase();

        const userID = await db.get('SELECT id FROM User WHERE username = ?', [username.decoded.username]);

        if (type === 'Movie') {
            const result = await db.run('INSERT INTO UserWatchedContent (userId, movieId, type) VALUES (?, ?, ?)', [userID.id, contentID, type]);

            if (result.changes === 0) {
                return res.status(500).send({ success: false, message: 'Content not watched' });
            }

            return res.status(201).send({ success: true, message: 'Content watched' });
        } else if (type === 'Series') {
            const result = await db.run('INSERT INTO UserWatchedContent (userId, seriesId, type) VALUES (?, ?, ?)', [userID.id, contentID, type]);

            if (result.changes === 0) {
                return res.status(500).send({ success: false, message: 'Content not watched' });
            }

            return res.status(201).send({ success: true, message: 'Content watched' });
        }
    },

    async watchLater(req, res) {
        const cookie = req.cookies.token;
        const username = validateCookie(cookie);

        if (!cookie || !username) {
            return res.status(401).send({ success: false, message: 'Unauthorized' });
        }

        const { contentID, type} = req.body;
        const db = await openDatabase();

        const userID = await db.get('SELECT id FROM User WHERE username = ?', [username.decoded.username]);

        if (type === 'Movie') {
            const result = await db.run('INSERT INTO UserWatchLater (username, movieId, type) VALUES (?, ?)', [userID.id, contentID, type]);

            if (result.changes === 0) {
                return res.status(500).send({ success: false, message: 'Content not added to watch later' });
            }

            return res.status(201).send({ success: true, message: 'Content added to watch later' });
        } else if (type === 'Series') {
            const result = await db.run('INSERT INTO UserWatchLater (username, seriestId, type) VALUES (?, ?, ?)', [userID.id, contentID, type]);

            if (result.changes === 0) {
                return res.status(500).send({ success: false, message: 'Content not added to watch later' });
            }

            return res.status(201).send({ success: true, message: 'Content added to watch later' });
        }
    }
}

module.exports = userController;