const asyncHandler = require('express-async-handler');
const Course = require("../model/Course")

//create course
const createCourse = asyncHandler(async (req, res) => {
    console.log('Request body:', req.body);

    const { courseName, courseCode, description, credits } = req.body;

    if (!courseName || !courseCode || !description || !credits) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    // Check if the course already exists by courseCode
    const courseExist = await Course.findOne({ courseCode });
    if (courseExist) {
        res.status(400);
        throw new Error("Course already exists");
    }

    const newCourse = await Course.create({
        courseName,
        courseCode,
        description,
        credits
    });

    res.status(201).json(newCourse);
});

// Get a course by ID
const getCourseById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }

    res.status(200).json(course);
});

// Get all courses
const getAllCoursess = asyncHandler(async (req, res) => {
    const courses = await Course.find();

    res.status(200).json(courses);
});

// Update a course by ID
const updateCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { courseName, courseCode, description, credits } = req.body;

    const course = await Course.findById(id);

    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }

    course.courseName = courseName || course.courseName;
    course.courseCode = courseCode || course.courseCode;
    course.description = description || course.description;
    course.credits = credits || course.credits;

    const updatedCourse = await course.save();

    res.status(200).json(updatedCourse);
});

// Delete a course by ID
const deleteCourse = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
        res.status(404);
        throw new Error("Course not found");
    }

    res.status(200).json({ message: "Course deleted successfully" });
});


module.exports = {
   createCourse,
   getCourseById,
   getAllCoursess,
   updateCourse,
    deleteCourse,
}