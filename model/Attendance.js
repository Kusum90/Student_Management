// Attendance Model
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    intern: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intern',
        required: true
    },
    date: {
        type: String,
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
        }
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model('Attendance', attendanceSchema);
