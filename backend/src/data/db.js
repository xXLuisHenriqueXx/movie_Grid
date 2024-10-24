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

    // TABELA QUE ARMAZENA OS USUÁRIOS COMUNS
    db.run(`
        CREATE TABLE IF NOT EXISTS User (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            password TEXT,
            email TEXT,
            age INTEGER,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // TABELA QUE ARMAZENA AS SÉRIES (TV SHOW E NOVELA)
    db.run(`
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
    db.run(`
        CREATE TABLE IF NOT EXISTS Movie (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            director TEXT,
            durationSeconds INTEGER,
            ageRestriction INTEGER CHECK (ageRestriction IN (0, 10, 12, 14, 16, 18)),
            releaseYear INTEGER,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // TABELA QUE ARMAZENA TAGS DE CONTEÚDO
    db.run(`
        CREATE TABLE IF NOT EXISTS Tag (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            contentID INTEGER,
            tag TEXT,
            FOREIGN KEY (contentID) REFERENCES Series(id),
            FOREIGN KEY (contentID) REFERENCES Movie(id)
        )
    `);

    // TABELA QUE ARMAZENA OS EPISÓDIOS DE SÉRIES
    db.run(`
        CREATE TABLE IF NOT EXISTS Episode (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            durationSeconds INTEGER,
            ageRestriction INTEGER,
            releaseYear TEXT,
            contentID INTEGER,
            season INTEGER,
            episodeNumber INTEGER,
            FOREIGN KEY (contentID) REFERENCES Series(id)
        )
    `);

    // GATILHO PARA GARANTIR QUE NÃO HAJA EPISÓDIOS DUPLICADOS NA MESMA TEMPORADA
    db.run(`
        CREATE TRIGGER IF NOT EXISTS check_episode_sequence
        BEFORE INSERT ON Episode
        FOR EACH ROW
        BEGIN
            declare episode_list INTEGER;

            IF NEW.season < 1 THEN
                SELECT RAISE(ABORT, 'Season must be greater than 0');
            END IF;

            IF NEW.episodeNumber < 1 THEN
                SELECT RAISE(ABORT, 'Episode number must be greater than 0');
            END IF;

            SET episode_list = (SELECT episodeNumber FROM Episode WHERE contentID = NEW.contentID AND season = NEW.season); 

            IF new.episodeNumber IN (episode_list) THEN
                SELECT RAISE(ABORT, 'Episode number already exists');
            END IF;

        END;
    `);

    // TABELA QUE ARMAZENA A PROGRAMAÇÃO DO DIA, COM CÁLCULO AUTOMÁTICO DE HORÁRIO DE FIM
    db.run(`
        CREATE TABLE IF NOT EXISTS DailySchedule (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,                  -- Data da exibição
            startTime TEXT,              -- Horário de início (fornecido pelo usuário)
            endTime TEXT,                -- Horário de fim (calculado automaticamente)
            contentId INTEGER,           -- Referência ao conteúdo principal (Série ou Filme)
            episodeId INTEGER,           -- Referência ao episódio, se for Série
            contentType TEXT CHECK (contentType IN ('Series', 'Movie')),
            FOREIGN KEY (contentId) REFERENCES Series(id),
            FOREIGN KEY (episodeId) REFERENCES Episode(id),
            FOREIGN KEY (contentId) REFERENCES Movie(id)
        );
    `);

    // GATILHO PARA CALCULAR O HORÁRIO DE FIM COM BASE NA DURAÇÃO
    db.run(`
        CREATE TRIGGER IF NOT EXISTS calculate_endTime
        BEFORE INSERT ON DailySchedule
        FOR EACH ROW
        BEGIN
            DECLARE durationSeconds INTEGER;
            IF NEW.contentType = 'Movie' THEN
                SELECT durationSeconds INTO durationSeconds FROM Movie WHERE id = NEW.contentId;
            ELSE
                SELECT durationSeconds INTO durationSeconds FROM Episode WHERE id = NEW.episodeId;
            END IF;

            SET NEW.endTime = TIME(NEW.startTime, '+' || durationSeconds || ' seconds');
        END;
    `);

    // GATILHO PARA IMPEDIR CONFLITOS DE HORÁRIO
    db.run(`
        CREATE TRIGGER IF NOT EXISTS check_schedule_conflict
        BEFORE INSERT ON DailySchedule
        FOR EACH ROW
        BEGIN
            DECLARE conflictCount INTEGER;

            SELECT COUNT(*) INTO conflictCount FROM DailySchedule
            WHERE
                date = NEW.date
                AND (
                    (NEW.startTime BETWEEN startTime AND endTime)
                    OR (NEW.endTime BETWEEN startTime AND endTime)
                    OR (startTime BETWEEN NEW.startTime AND NEW.endTime)
                );

            IF conflictCount > 0 THEN
                SELECT RAISE(ABORT, 'Horário conflita com outro conteúdo já agendado.');
            END IF;
        END;
    `);

    // Trigger para garantir que se um dailySchedule for de uma série, o episodeId deve ser preenchido com um episódio que já exista
    db.run(`
        CREATE TRIGGER IF NOT EXISTS check_episode_id
        BEFORE INSERT ON DailySchedule
        FOR EACH ROW
        BEGIN
            declare episode_list INTEGER;

            IF NEW.contentType = 'Series' AND NEW.episodeId IS NULL THEN
                SELECT RAISE(ABORT, 'Episode ID must be filled for series content');
            END IF;

            SET episode_list = (SELECT id FROM Episode WHERE contentID = NEW.contentID);

            IF NEW.contentType = 'Series' THEN
                IF NEW.episodeId NOT IN (episode_list) THEN
                    SELECT RAISE(ABORT, 'Episode ID must be filled with an existing episode');
                END IF;
            END IF;
        END;
    `);

    // TABELA QUE ARMAZENA CONTEÚDO ASSISTIDO PELOS USUÁRIOS
    db.run(`
        CREATE TABLE IF NOT EXISTS UserWatchedContent (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            contentId INTEGER,
            watchedAt TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES User(id),
            FOREIGN KEY (contentId) REFERENCES Series(id),
            FOREIGN KEY (contentId) REFERENCES Movie(id)
        )
    `);
}

module.exports = {
    openDatabase,
    initDatabase
};
