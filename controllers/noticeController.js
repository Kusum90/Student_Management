const asyncHandler = require('express-async-handler');
const Notice = require("../model/noticeModel");


//create notice
const createnotice = asyncHandler(async (req, res) => {
    const { title, Description, Date } = req.body;
    if (!title || !Description || !Date) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }
    const notice = await Notice.create({
        title,
        Description,
        Date
    });
    res.status(201).json(notice);
});


//get all the notices
const getnotices = asyncHandler(async (req, res) => {
    const notice = await Notice.find({})
    res.status(200).json(notice);
});

//get notice by intern_id
const getnoticebyid = asyncHandler(async (req, res) => {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
        res.status(404);
        throw new Error("Group is not found");
    }
    const getnoticebyid = await Notice.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(getnoticebyid);
});



//update a notice by notice id
const updatenotice = asyncHandler(async (req, res) => {
    const notice = await Notice.findById(req.params.id);
    if (!notice) {
        res.status(404);
        throw new Error("Notice not found");
    }
    const updatenotice = await Notice.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatenotice);
});

//Delet a notices
const deletenotice = asyncHandler(async(req,res) => {
    const notice = await Notice.findById(req.params.id);
   if(!notice){
    res.status(404);
    throw new Error("Notice not found");
   }
   const  deletnotice = await Notice.findByIdAndDelete(req.params.id );
    res.status(200).json (notice);
});

module.exports = {
    createnotice,
    getnotices,
    getnoticebyid,
    updatenotice,
    deletenotice
}