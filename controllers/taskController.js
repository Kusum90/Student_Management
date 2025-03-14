const asyncHandler = require('express-async-handler');
const Task = require("../model/developerModel");
const Group = require("../model/group");

//create task
const createtask = asyncHandler(async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const { Intern_id:Intern_Id,task, Description, Assigned_Date, Submission_Date, Group: group_id , file} = req.body;
    if (!Intern_Id| !task || !Description || !Assigned_Date || !Submission_Date || !group_id) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

    //check if the group exist
    const groupExist = await Group.findById(group_id);
    if (!groupExist) {
        res.status(400);
        throw new Error("Group does not exist");
    }

    const newtask = await Task.create({
        task,
        Description,
        file ,
        Assigned_Date,
        Submission_Date,
        Group: group_id,
        Intern_id: Intern_Id
    });
    res.status(201).json(newtask);
});


//get all the task
const gettask = asyncHandler(async (req, res) => {
    const task = await Task.find({})
    res.status(200).json(task);
});


//get task by id
const gettaskbyid = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task is not found");
    }
    const gettaskbyid = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(gettaskbyid);
});


//update a task by  id
const updatetask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task is not found");
    }
    const updatetask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatetask);
});


//Delete a given task
const delettask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        res.status(404);
        throw new Error("Task is not found");
    }
    const deletetask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(deletetask);
});


module.exports = {
    createtask,
    gettask,
    gettaskbyid,
    updatetask,
    delettask,
}