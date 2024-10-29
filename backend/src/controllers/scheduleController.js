const database = require('../data/db')

const scheduleController = {
    async getScheduleByDay(req, res) {
        let {date} = req.body;

        if (!startDate || !endDate) {
            return res.status(400).send({ success: false, message: 'Missing parameters' });
        }

        date = new Date(date);

        if (startDate > endDate) {
            return res.status(400).send({ success: false, message: 'Invalid date range' });
        }

        const db = await database.openDatabase();

        const schedules = await db.all('SELECT * FROM Schedule WHERE date = ? ORDER BY startTime DESC', [date]);

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