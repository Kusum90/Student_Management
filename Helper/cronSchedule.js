const cron = require('node-cron');
const { calculateAttendanceAndSendWarnings } = require('./controllers/attendanceController');

// Schedule the task to run at the end of every month
cron.schedule('0 0 28-31 * *', () => {
    const d = new Date();
    if (d.getDate() === new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()) {
        calculateAttendanceAndSendWarnings();
    }
});
