const bcrypt = require('bcrypt');
const db = require('../config/db');

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
    }
}

module.exports = userController;