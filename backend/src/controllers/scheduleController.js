const database = require('../data/db')

const scheduleController = {
    async getSchedules(req, res) {
        let { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).send({ success: false, message: 'Missing parameters' });
        }

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        if (startDate > endDate) {
            return res.status(400).send({ success: false, message: 'Invalid date range' });
        }

        const db = await database.openDatabase();

        const schedules = await db.all('SELECT * FROM Schedule WHERE date BETWEEN ? AND ? ORDER BY startTime DESC', [startDate, endDate]);

        // Agrupar resultados por data
        const groupedSchedules = schedules.reduce((acc, schedule) => {
            const date = schedule.date;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(schedule);
            return acc;
        }, {});

        res.send({ success: true, schedules: groupedSchedules });
    }
}

module.exports = scheduleController;