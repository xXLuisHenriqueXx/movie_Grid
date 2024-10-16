const bcrypt = require('bcryptjs');
const { openDatabase } = require('../config/db');

const adminController = {
    async register(req, res) {
        const db = await openDatabase();
        const { username, password } = req.body;

        const admin = await db.get('SELECT * FROM Admin WHERE username = ?', [username]);
        if (admin) {
            return res.status(400).send({ sucess: false, error: 'Admin already exists' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        try {
            await db.run('INSERT INTO Admin (username, password) VALUES (?, ?)', [username, hashedPassword]);

            res.status(201).send({ sucess: true, message: 'Admin registered' });
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
                return res.status(401).send({ sucess: false, error: 'Invalid username or password' });
            }

            res.cookie('token', createCookie(username), { httpOnly: true });

            res.status(200).send({ sucess: true, message: 'Admin logged in' });
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
}

module.exports = adminController;