const asyncHandler = require('express-async-handler');
const InternAssignment = require("../model/internModel")
const Task = require("../model/developerModel")
const mongoose = require("mongoose")


//submit task
const submittask = asyncHandler(async (req, res) => {
    const { Developer_id,githubUrl,submit_date } = req.body;
    if (!Developer_id || !githubUrl || !submit_date) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const Submit = await InternAssignment.create({
        Developer_id,githubUrl,submit_date
    });
    res.status(201).json(Submit);
});


//get all the submited task
const getsubmit = asyncHandler(async (req, res) => {
    const submit = await InternAssignment.find({})
    res.status(200).json(submit);
});


//get submited task by id
const getsubmitid = asyncHandler(async (req, res) => {
    const submit = await InternAssignment.findById(req.params.id);
    if (!submit) {
        res.status(404);
        throw new Error("submitted task is not found");
    }
    const getsubmitid = await InternAssignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(getsubmitid);
});


//update a submited task by it's id
const updatesubmit = asyncHandler(async (req, res) => {
    const submit = await InternAssignment.findById(req.params.id);
    if (!submit) {
        res.status(404);
        throw new Error("Submitted task not found");
    }
    const updatesubmit = await InternAssignment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatesubmit);
});


//Delet a submit task
const deletesubmit = asyncHandler(async(req,res) => {
    const submit = await InternAssignment.findById(req.params.id);
   if(!submit){
    res.status(404);
    throw new Error("assignment not found");
   }
   const deletesubmit = await InternAssignment.findByIdAndDelete(req.params.id );
    res.status(200).json (deletesubmit);
});


//get all submitted task
const gettask = asyncHandler(async (req, res) => {
    const tasks = await Task.find({}).populate("intern_id", "githubUrl submit_date").exec();
    res.status(200).json(tasks);
});


module.exports = {
    submittask,
    getsubmit,
    getsubmitid,
    updatesubmit,
    deletesubmit,
    gettask
}