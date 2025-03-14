
const AcademicsPage = require('../model/AcedemicsPage')
const Intern = require('../model/INTERN')

// Create a new Academics Page
const createAcademicsPage = async (req, res) => {
    try {
        const { intern, enrolledCourses, allCourses } = req.body;

        // Ensure the intern exists
        const internExists = await Intern.findById(intern);
        if (!internExists) {
            return res.status(404).json({ message: "Intern not found" });
        }

        const academicsPage = new AcademicsPage({ intern, enrolledCourses, allCourses });
        await academicsPage.save();

        res.status(201).json(academicsPage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Academics Page by Intern ID
const getAcademicsPageByInternId = async (req, res) => {
    try {
        const { internId } = req.params;
        const academicsPage = await AcademicsPage.findOne({ intern: internId }).populate('intern enrolledCourses allCourses');

        if (!academicsPage) {
            return res.status(404).json({ message: "Academics Page not found" });
        }

        res.status(200).json(academicsPage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Enrolled Courses
const updateEnrolledCourses = async (req, res) => {
    try {
        const { internId } = req.params;
        const { enrolledCourses } = req.body;

        const academicsPage = await AcademicsPage.findOneAndUpdate(
            { intern: internId },
            { enrolledCourses },
            { new: true }
        ).populate('intern enrolledCourses allCourses');

        if (!academicsPage) {
            return res.status(404).json({ message: "Academics Page not found" });
        }

        res.status(200).json(academicsPage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ensure all functions are exported correctly
module.exports = {
    createAcademicsPage,
    getAcademicsPageByInternId,
    updateEnrolledCourses,
    getAllCourses,
};