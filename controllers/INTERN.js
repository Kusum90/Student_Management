const asyncHandler = require("express-async-handler");
const INTERN = require("../model/INTERN");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Group = require("../model/group");
const User = require("../model/userModel")

const createdIntern = asyncHandler(async (req, res) => {
    const { Fullname, email, password, phone,image ,address, collage_name, collage_year, internship_tenior, assigned_group: group_id, assigned_developer: Developer_id, Intern_Id } = req.body;

    // Check for required fields
    if (!Fullname || !email || !password || !image ||!phone || !address || !collage_name || !collage_year || !internship_tenior || !Intern_Id) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Check if Group exists
    const groupExists = await Group.findById(group_id);
    if (!groupExists) {
        res.status(400);
        throw new Error('Group does not exist');
    }

    // Check if Developer exists
    const developerExists = await User.findById(Developer_id);
    if (!developerExists) {
        res.status(400);
        throw new Error('Developer does not exist');
    }

    // Check if intern already exists
    const InternExists = await INTERN.findOne({ email });
    if (InternExists) {
        res.status(400);
        throw new Error("Intern already exists");
    }

    // Create new intern
    const newIntern = new INTERN({
        Fullname,
        email,
        password: hashedPassword,
        phone,
        address,
        image,
        collage_name,
        collage_year,
        internship_tenior,
        assigned_group: group_id,
        assigned_developer: Developer_id,
        Intern_Id,
        UserRole: "Intern" // Assuming UserRole is always "Intern" for this endpoint
    });

    const createdIntern = await newIntern.save();

    if (createdIntern) {
        res.status(201).json(createdIntern);
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


//login user
const loginIntern = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const intern = await INTERN.findOne({ email });
    //compare password with hashpassword
    if (intern && (await bcrypt.compare(password, intern.password))) {
        const accessToken = jwt.sign({
            intern: {
                username: intern.username,
                email: intern.email,
                UserRole:intern.UserRole,
                id: intern.id
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "99h"
            });
        res.status(200).json({ accessToken });
        //res.json({ message: "login user" });
    }else{
        res.status(400);
        throw new Error("Invalid intern");
    }
});


//current intern info
const currentintern = asyncHandler(async (req, res) => {
    res.json(req.intern);
});



//uopdate all the user ny user id
const updatintern = asyncHandler(async (req, res) => {
    const update = await INTERN.findById(req.params.id);
    if (!update) {
        res.status(404);
        throw new Error("intern  not found");
    }
    const updateintern = await INTERN.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updateintern);
});
        
//get all the intern
const getintern = asyncHandler(async (req, res) => {
    const intern = await INTERN.find({})
    res.status(200).json(intern);
});

//get user by user_id
const getinternbyid = asyncHandler(async (req, res) => {
    const intern = await INTERN.findById(req.params.id);
    if (!intern) {
        res.status(404);
        throw new Error("intern is not found");
    }
    const getinternbyid = await INTERN.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(getinternbyid);
});


// Get users by UserRole
const getinternByRole = asyncHandler(async (req, res) => {
    const { role } = req.params;

    if (!role) {
        res.status(400);
        throw new Error("Role is required");
    }

    const intern = await INTERN.find({ UserRole: role });

    if (!intern.length) {
        res.status(404);
        throw new Error("No users found with this role");
    }

    res.status(200).json(intern);
});



//update a intern by user id
const updateinternbyid = asyncHandler(async (req, res) => {
    const intern = await INTERN.findById(req.params.id);
    if (!intern) {
        res.status(404);
        throw new Error("intern not found");
    }
    const updateinternbyid = await INTERN.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updateinternbyid);
});

//Delet a intern
const deleteintern = asyncHandler(async(req,res) => {
    const intern = await INTERN.findById(req.params.id);
   if(!intern){
    res.status(404);
    throw new Error("intern not found");
   }
   const  deleteintern = await INTERN.findByIdAndDelete(req.params.id );
    res.status(200).json (deleteintern );
});


module.exports = {
    createdIntern,
    loginIntern,
    currentintern,
    updatintern,
    getintern,
    getinternbyid,
    getinternByRole,
    updateinternbyid,
    deleteintern
}