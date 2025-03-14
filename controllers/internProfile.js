const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose")
const Profile = require("../model/InternProfile")
const Upload = require("../Helper/upload")

//create a internprofile
const createintern = asyncHandler(async (req, res) => {
    const { Fullname ,email ,phone ,address,collage_name, collage_year,internship_tenior } = req.body;
    if (!Fullname || !email || !phone || !address || !collage_name || !collage_year || !internship_tenior) {
        res.status(400);
        throw new Error("All Fields are Mandatory");
    }

       // Check if intern already exists
       const internExists = await Profile.findOne({ email });
       if (internExists) {
           res.status(400);
           throw new Error("Intern already exists");
       }

       let fileUrl = null;
    if (req.file) {
        const upload = await Upload.uploadfile(req.file.path);
        fileUrl = upload.secure_url;
    } else {
        res.status(400);
        throw new Error("File is mandatory");
    }
       
    const Intern = await Profile.create({
        Fullname ,
        email ,
        phone ,
        address,
        image: fileUrl,
        collage_name, 
        collage_year,
        internship_tenior
    });
    res.status(201).json(Intern);

});



//get all the intern_profile
const getallIntern = asyncHandler(async (req, res) => {
    const profile = await Profile.find({})
    res.status(200).json(profile);
});


//get intern_profile task by id
const getInternid = asyncHandler(async (req, res) => {
    const Intern = await Profile.findById(req.params.id);
    if (!Intern) {
        res.status(404);
        throw new Error("intern profile is not found");
    }
    const getInternid = await Profile.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(getInternid);
});


//update a intern profile by it's id
const updateIntern = asyncHandler(async (req, res) => {
    const Intern = await Profile.findById(req.params.id);
    if (!Intern) {
        res.status(404);
        throw new Error("Intern profile is not found");
    }
    const updateIntern = await Profile.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updateIntern);
});


//Delet a intern profile
const deleteIntern = asyncHandler(async(req,res) => {
    const Intern = await Profile.findById(req.params.id);
   if(!Intern){
    res.status(404);
    throw new Error("Intern profile is not found");
   }
   const deleteIntern = await Profile.findByIdAndDelete(req.params.id );
    res.status(200).json (deleteIntern);
});


module.exports = {
   createintern ,
   getallIntern ,
   getInternid ,
   updateIntern ,
   deleteIntern
}