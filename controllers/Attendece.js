const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const Attendance = require('../model/Attendance');
const sendEmail = require('../Helper/nodemailer')


// Add attendance record
const addAttendance = asyncHandler(async (req, res) => {
    const { internId, date, status } = req.body;
    
    if (!internId || !date || !status) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    //existing attendences
    const existingAttendence = await Attendance.findOne({ intern :internId, date });
    if (existingAttendence) {
        res.status(400);
        throw new Error("Attendance already exists for this date");
        }
    const attendance = new Attendance({
        intern: internId,
        date,
        status
    });

    await attendance.save();
    res.status(201).json({ success: true, message: 'Attendance recorded successfully' });
});

// Calculate attendance and issue warnings
const calculateAttendance = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { internId } = req.body;

    // Log internId being used
    console.log('Intern ID:', internId);

        // Check if internId is valid
        if (!mongoose.Types.ObjectId.isValid(internId)) {
            res.status(400);
            throw new Error('Invalid Intern ID');
        }

    const totalClasses = await Attendance.countDocuments({ intern: internId });
    const attendedClasses = await Attendance.countDocuments({ intern: internId, status: 'present' });

    if (totalClasses === 0) {
        res.status(400);
        throw new Error("No attendance records found for the intern");
    }

    const attendancePercentage = (attendedClasses / totalClasses) * 100;
    let warnings = 0;
    let message = '';

    if (attendancePercentage < 40) {
        warnings = 3;
         message = 'You have received your third warning due to attendance below 40%. Immediate action is required.';
    } else if (attendancePercentage < 50) {
        warnings = 2;
          message = 'You have received your second warning due to attendance below 50%. Please improve your attendance.';
    } else if (attendancePercentage < 75) {
        warnings = 1;
        message = 'You have received your first warning due to attendance below 75%. Please be mindful of your attendance.';
    }

    
    const intern = await User.findById(internId);

    // Log the result of the findById call
   console.log('Intern:', intern);


    if (!intern) {
        res.status(404);
        throw new Error("Intern not found");
    }

    await User.findByIdAndUpdate(internId, { warnings });

if (warnings > 0) {
        await sendEmail(intern.email, `Attendance Warning - Level ${warnings}`, message);
    }

    res.status(200).json({ 
        success: true, 
        attendancePercentage, 
        warnings, 
        message: `Intern has ${attendancePercentage}% attendance and ${warnings} warnings` 
    });
    
});


// find attendence by date
// const getAttendencesByDate = asyncHandler(async(req,res) => {
//     const { date } = req.params;
//     const attendences = await Attendance.find({ date: date });
//     res.status(200).json({ 
//         success: true, 
//         attendences 
//     });
// });


// Find attendance by week
// const getAttendanceByWeek = asyncHandler(async (req, res) => {
//     const { year, week } = req.params;
//     const startDate = new Date(year, 0, 1 + (week - 1) * 7);
//     const endDate = new Date(year, 0, 1 + week * 7);
//     const attendance = await Attendance.find({
//         date: {
//             $gte: startDate,
//             $lt: endDate
//         }
//     });
//     res.status(200).json(attendance);
// });


module.exports = {
    addAttendance,
    calculateAttendance,
    // getAttendencesByDate,
    // getAttendanceByWeek
};
