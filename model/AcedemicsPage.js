const mongoose = require("mongoose");

const academicsPageSchema = new mongoose.Schema({
    intern: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intern',
        required: true,
    },
    enrolledCourses: [{
        type: String ,
        ref: 'Course',
    }],
    allCourses: [{
        type: String ,
        ref: 'Course',
    }]
}, { timestamps: true });
module.exports = mongoose.model('AcademicsPage', academicsPageSchema);