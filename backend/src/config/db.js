const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('node:path');

async function openDatabase() {
    const dbPath = path.resolve(__dirname, 'db.sqlite');
    return sqlite.open({
        filename: dbPath,
        driver: sqlite3.Database
    });
}

async function initDatabase() {
    const db = await openDatabase();

    // TABELA QUE ARMAZENA OS USUÁRIOS ADMINISTRADORES
    db.run(`
        CREATE TABLE IF NOT EXISTS Admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // TABELA QUE ARMAZENA OS PROGRAMAS DE TV
    db.run(`
        CREATE TABLE IF NOT EXISTS TVShow (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            owner TEXT,
            durationSeconds INTEGER,
            ageRestriction INTEGER,
            releaseYear TEXT,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // TABELA QUE ARMAZENA OS FILMES
    db.run(`
        CREATE TABLE IF NOT EXISTS Movie (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            director TEXT,
            durationSeconds INTEGER,
            ageRestriction INTEGER,
            releaseYear TEXT,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // TABELA QUE ARMAZENA AS NOVELAS
    db.run(`
        CREATE TABLE IF NOT EXISTS SoapOpera (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            owner TEXT,
            numberEpisodes INTEGER,
            ageRestriction INTEGER,
            releaseYear TEXT,
            type TEXT,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // TABELA QUE ARMAZENA OS EPISÓDIOS DE NOVELAS
    db.run(`
        CREATE TABLE IF NOT EXISTS SoapOperaEpisode (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            durationSeconds INTEGER,
            ageRestriction INTEGER,
            soapOperaId INTEGER,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (soapOperaId) REFERENCES SoapOpera(id)
        );
    `);

    // TABELA QUE ARMAZENA A PROGRAMAÇÃO DO DIA
    db.run(`
        CREATE TABLE IF NOT EXISTS DailySchedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            contentId INTEGER,
            contentType TEXT CHECK (contentType IN ('TVShow', 'SoapOpera', 'Movie')),
            FOREIGN KEY (contentId) REFERENCES TVShow(id),
            FOREIGN KEY (contentId) REFERENCES SoapOpera(id),
            FOREIGN KEY (contentId) REFERENCES Movie(id)
        );
    `);
}

module.exports = {
    openDatabase,
    initDatabase
};