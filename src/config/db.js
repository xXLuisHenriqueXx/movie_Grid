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
        CREATE TABLE Admin (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // TABELA QUE ARMAZENA OS PROGRAMAS DE TV
    db.run(`
        CREATE TABLE TVShow (
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
        CREATE TABLE Movie (
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
        CREATE TABLE SoapOpera (
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
        CREATE TABLE SoapOperaEpisode (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            durationSeconds INTEGER,
            ageRestriction INTEGER,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
            soapOperaId INTEGER,
            FOREIGN KEY (soapOperaId) REFERENCES SoapOpera(id)
        )
    `);

    // TABELA QUE ARMAZENA A PROGRAMAÇÃO DO DIA
    db.run(`
        CREATE TABLE DailySchedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            startTime TEXT,
            endTime TEXT,
            type TEXT,
            contentId INTEGER,
            FOREIGN KEY (contentId) REFERENCES TVShow(id),
            FOREIGN KEY (contentId) REFERENCES SoapOpera(id),
            FOREIGN KEY (contentId) REFERENCES Movie(id)
        )
    `);

        // TABELA QUE ARMAZENA A PROGRAMAÇÃO SEMANAL
    db.run(`
        CREATE TABLE WeeklySchedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            dayId INTEGER,
            FOREIGN KEY (dayId) REFERENCES DailySchedule(id),
        )
    `);
}

module.exports = {
    openDatabase,
    initDatabase
};