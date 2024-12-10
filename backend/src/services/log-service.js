const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('node:path');

const ALLOWED_LEVELS = ['WARN', 'INFO', 'ERROR'];


async function openLogDatabase() {
    const dbPath = path.resolve(__dirname, '../data/logs.sqlite');
    return sqlite.open({
        filename: dbPath,
        driver: sqlite3.Database
    });
}

async function initLogDatabase() {
    const db = await openLogDatabase();

    await db.run(`
        CREATE TABLE IF NOT EXISTS Logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            level TEXT CHECK (level IN ('WARN', 'INFO', 'ERROR')),
            message TEXT,
            createdAt TEXT DEFAULT (datetime('now', 'localtime', 'utc', '-3 hours'))
        )
    `);

    return db;
}

async function createLog(level, message) {
    if (!ALLOWED_LEVELS.includes(level)) {
        throw new Error(`Nível inválido. Os níveis permitidos são: ${ALLOWED_LEVELS.join(', ')}`);
    }

    const db = await initLogDatabase();
    await db.run(`
        INSERT INTO Logs (level, message)
        VALUES (?, ?)
    `, [level, message]);
    await db.close();
}

async function followLogs() {
    const db = await openLogDatabase();

    console.log('Acompanhando logs em tempo real. Pressione Ctrl+C para sair.');

    let lastId = 0;

    setInterval(async () => {
        const logs = await db.all(`
            SELECT * FROM Logs
            WHERE id > ?
            ORDER BY id ASC
        `, [lastId]);

        logs.forEach(log => {
            console.log(`[${log.createdAt}] [${log.level}] ${log.message}`);
            lastId = log.id;
        });
    }, 1000);
}

if (require.main === module) {
    const args = process.argv.slice(2);
    if (args[0] === 'follow') {
        followLogs();
    } else {
        console.log('Uso: node log-service.js follow');
    }
}

module.exports = {
    createLog,
    initLogDatabase
};