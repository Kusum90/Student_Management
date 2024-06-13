// const express = require('express');
// const router = express.Router();
// const InternAssignment = require("../model/internModel");

// // submit an assignment
// router.post('/submit', async (req, res) => {
//     try {
//         const data = req.body;

//         const newAssignment = new InternAssignment(data);
//         const savedAssignment = await newAssignment.save();
//         console.log('Assignment is submited');
//         res.status(200).json(savedAssignment);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Get all assignments
// router.get('/submit', async (req, res) => {
//     try {
//         const assignments = await InternAssignment.find();
//         console.log('Assignments fetched');
//         res.status(200).json(assignments);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });p

// // Update a assigment
// router.put('/submit/:id', async (req, res) => {
//     try {
//         const submitId = req.params.id;
//         const updatedData = req.body;

//         const updatedSubmit = await InternAssignment.findByIdAndUpdate(submitId, updatedData, { new: true });

//         if (!updatedSubmit) {
//             return res.status(404).json({ error: 'Notice not found' });
//         }

//         console.log('Notice is updated');
//         res.status(200).json(updatedSubmit); // Ensure the response is sent back
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// module.exports = router;
