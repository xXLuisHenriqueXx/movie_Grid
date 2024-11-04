const { openDatabase, initDatabase } = require('./db');  // Certifique-se de apontar para o local correto do arquivo

async function seedDatabase() {
    const db = await openDatabase();
    await initDatabase();

    // Inserção de Usuários Não-Administrativos
    const users = [
        { username: 'user1', password: 'pass1', email: 'user1@example.com', age: 25 },
        { username: 'user2', password: 'pass2', email: 'user2@example.com', age: 30 },
        { username: 'user3', password: 'pass3', email: 'user3@example.com', age: 20 },
        { username: 'user4', password: 'pass4', email: 'user4@example.com', age: 28 },
        { username: 'user5', password: 'pass5', email: 'user5@example.com', age: 33 },
    ];

    for (const user of users) {
        await db.run(`
            INSERT INTO User (username, password, email, age, isAdmin) 
            VALUES (?, ?, ?, ?, 0)`, [user.username, user.password, user.email, user.age]);
    }

    // Inserção de Séries com 3 episódios cada
    const series = [
        { title: 'Series 1', description: 'Desc 1', producer: 'Producer 1', ageRestriction: 16, releaseYear: 2021, seriesType: 'TVShow' },
        { title: 'Series 2', description: 'Desc 2', producer: 'Producer 2', ageRestriction: 12, releaseYear: 2022, seriesType: 'SoapOpera' },
        // Adicione mais 8 séries seguindo o mesmo padrão
    ];

    for (const s of series) {
        const result = await db.run(`
            INSERT INTO Series (title, description, producer, ageRestriction, releaseYear, seriesType) 
            VALUES (?, ?, ?, ?, ?, ?)`, [s.title, s.description, s.producer, s.ageRestriction, s.releaseYear, s.seriesType]);
        const seriesId = result.lastID;

        // Inserção de Episódios para cada série
        for (let i = 1; i <= 3; i++) {
            await db.run(`
                INSERT INTO Episode (title, description, durationSeconds, ageRestriction, releaseYear, contentID, season, episodeNumber) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [`Ep ${i}`, `Desc Ep ${i}`, 1800, s.ageRestriction, s.releaseYear, seriesId, 1, i]);
        }
    }

    // Inserção de Filmes
    const movies = [
        { title: 'Movie 1', description: 'Desc 1', director: 'Director 1', durationSeconds: 5400, ageRestriction: 16, releaseYear: 2020 },
        { title: 'Movie 2', description: 'Desc 2', director: 'Director 2', durationSeconds: 4800, ageRestriction: 18, releaseYear: 2019 },
        // Adicione mais 8 filmes seguindo o mesmo padrão
    ];

    for (const m of movies) {
        await db.run(`
            INSERT INTO Movie (title, description, director, durationSeconds, ageRestriction, releaseYear) 
            VALUES (?, ?, ?, ?, ?, ?)`, [m.title, m.description, m.director, m.durationSeconds, m.ageRestriction, m.releaseYear]);
    }

    console.log("Data seeded successfully.");
}

seedDatabase().catch(console.error);
