const bcrypt = require('bcryptjs');
const cookie = require('cookie');
const { openDatabase } = require('../config/db');

const adminController = {
    async register(req, res) {
        const db = await openDatabase();
        const { username, password } = req.body;

        const admin = await db.get('SELECT * FROM Admin WHERE username = ?', [username]);
        if (admin) {
            return res.status(400).send({ error: 'Admin already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        try {
            await db.run('INSERT INTO Admin (username, password) VALUES (?, ?)', [username, hashedPassword]);

            res.status(201).send({ message: 'Admin registered' });
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    },

    async login(req, res) {
        const db = await openDatabase();
        const { username, password } = req.body;

        try {
            const admin = await db.get('SELECT * FROM Admin WHERE username = ?', [username]);

            if (!admin || !bcrypt.compareSync(password, admin.password)) {
                return res.status(401).send({ error: 'Invalid username or password' });
            }

            res.setHeader('Set-Cookie', cookie.serialize('token', admin.username, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7 // 1 week
            }));

            res.status(200).send({ message: 'Admin logged in' });
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    },

    logout(req, res) {
        res.setHeader('Set-Cookie', cookie.serialize('token', '', {
            httpOnly: true,
            maxAge: 0
        }));

        res.status(200).send({ message: 'Admin logged out' });
    }
}