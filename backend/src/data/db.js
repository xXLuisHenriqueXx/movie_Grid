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

    // TABELA QUE ARMAZENA OS USUÁRIOS COMUNS
    await db.run(`
        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            email TEXT,
            age INTEGER,
            isAdmin INTEGER DEFAULT 0,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // TABELA QUE ARMAZENA AS SÉRIES (TV SHOW E NOVELA)
    await db.run(`
        CREATE TABLE IF NOT EXISTS Series (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            producer TEXT,
            ageRestriction INTEGER CHECK (ageRestriction IN (0, 10, 12, 14, 16, 18)),
            releaseYear INTEGER,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
            seriesType TEXT CHECK (seriesType IN ('TVShow', 'SoapOpera'))
        )
    `);

    // TABELA QUE ARMAZENA OS FILMES
    await db.run(`
        CREATE TABLE IF NOT EXISTS Movie (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            director TEXT,
            durationMinutes INTEGER,
            ageRestriction INTEGER CHECK (ageRestriction IN (0, 10, 12, 14, 16, 18)),
            releaseYear INTEGER,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Tabela para armazenar tags existentes
    await db.run(`
        CREATE TABLE IF NOT EXISTS Tags (
            tagname TEXT PRIMARY KEY
        )
    `);

    // TABELA QUE ARMAZENA TAGS DE CONTEÚDO
    await db.run(`
        CREATE TABLE IF NOT EXISTS ContentTag (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tag TEXT,
            episodeID INTEGER,
            movieID INTEGER,
            seriesID INTEGER,
            FOREIGN KEY (tag) REFERENCES Tags(tagname),
            FOREIGN KEY (episodeID) REFERENCES Episode(id),
            FOREIGN KEY (movieID) REFERENCES Movie(id),
            FOREIGN KEY (seriesID) REFERENCES Series(id)
        )
    `);

    // TABELA QUE ARMAZENA OS EPISÓDIOS DE SÉRIES
    await db.run(`
        CREATE TABLE IF NOT EXISTS Episode (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            durationMinutes INTEGER,
            seriesID INTEGER,
            season INTEGER,
            episodeNumber INTEGER,
            FOREIGN KEY (seriesID) REFERENCES Series(id)
        )
    `);

    // GATILHO PARA GARANTIR QUE NÃO HAJA EPISÓDIOS DUPLICADOS NA MESMA TEMPORADA
    await db.run(`
        CREATE TRIGGER IF NOT EXISTS check_episode_sequence
        BEFORE INSERT ON Episode
        FOR EACH ROW
        BEGIN
            SELECT CASE 
                WHEN NEW.season < 1 THEN RAISE(ABORT, 'Season must be greater than 0')
                WHEN NEW.episodeNumber < 1 THEN RAISE(ABORT, 'Episode number must be greater than 0')
                WHEN EXISTS (
                    SELECT 1 FROM Episode 
                    WHERE seriesID = NEW.seriesID AND season = NEW.season AND episodeNumber = NEW.episodeNumber
                ) THEN RAISE(ABORT, 'Episode number already exists')
            END;
        END;
    `);

    // TABELA QUE ARMAZENA A PROGRAMAÇÃO DO DIA
    await db.run(`
        CREATE TABLE IF NOT EXISTS DailySchedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date DATE,
            startTime TEXT,
            endTime TEXT,
            episodeID INTEGER,
            movieID INTEGER,
            contentType TEXT CHECK (contentType IN ('Series', 'Movie')),
            FOREIGN KEY (episodeID) REFERENCES Episode(id),
            FOREIGN KEY (movieID) REFERENCES Movie(id)
        );
    `);

    // GATILHO PARA GARANTIR QUE EXISTE UM EPISÓDIO PARA SÉRIES
    await db.run(`
        CREATE TRIGGER IF NOT EXISTS check_episode_id
        BEFORE INSERT ON DailySchedule
        FOR EACH ROW
        BEGIN
            SELECT CASE 
                WHEN NEW.contentType = 'Series' AND NEW.episodeID IS NULL THEN 
                    RAISE(ABORT, 'Episode ID must be filled for series content')
                WHEN NEW.contentType = 'Series' AND NOT EXISTS (
                    SELECT 1 FROM Episode WHERE id = NEW.episodeID
                ) THEN 
                    RAISE(ABORT, 'Episode ID must be filled with an existing episode')
            END;
        END;
    `);


    await db.run(`
        CREATE TRIGGER IF NOT EXISTS check_schedule_conflict
        BEFORE INSERT ON DailySchedule
        FOR EACH ROW
            BEGIN
                SELECT CASE 
                WHEN EXISTS (
                SELECT 1 FROM DailySchedule 
                WHERE date = NEW.date AND (
                    (NEW.startTime < endTime AND NEW.endTime > startTime)
                )
                ) THEN RAISE(ABORT, 'Horário conflita com outro conteúdo já agendado.')
            END;
        END;
    `);

    // TABELA QUE ARMAZENA CONTEÚDO ASSISTIDO PELOS USUÁRIOS
    await db.run(`
        CREATE TABLE IF NOT EXISTS UserWatchedContent (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            movieID INTEGER,
            seriesID INTEGER,
            type TEXT CHECK (type IN ('Series', 'Movie')),
            watchedAt TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES User(id),
            FOREIGN KEY (movieID) REFERENCES Movie(id),
            FOREIGN KEY (seriesID) REFERENCES series(id)
        )
    `);

    // TRIGGER PARA GARANTIR QUE SE FOR DO TIPO SÉRIE, O EPISÓDIO EXISTE
    await db.run(`
        CREATE TRIGGER IF NOT EXISTS check_episode_exists
        BEFORE INSERT ON UserWatchedContent
        FOR EACH ROW
        BEGIN
            SELECT CASE
                WHEN NEW.type = 'Series' AND NOT EXISTS (
                    SELECT 1 FROM Episode WHERE id = NEW.episodeID
                ) THEN RAISE(ABORT, 'Episode does not exist')
            END;
        END;
    `);

    // TABELA QUE ARMAZENA ASSISTIR MAIS TARDE
    await db.run(`
        CREATE TABLE IF NOT EXISTS UserWatchLater (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            movieID INTEGER,
            seriesID INTEGER,
            type TEXT CHECK (type IN ('Series', 'Movie')),
            FOREIGN KEY (userId) REFERENCES User(id),
            FOREIGN KEY (movieID) REFERENCES Movie(id),
            FOREIGN KEY (seriesID) REFERENCES Series(id)
        )
    `);
}

module.exports = {
    openDatabase,
    initDatabase
};