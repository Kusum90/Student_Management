const asyncHandler = require('express-async-handler');
const Group = require("../model/group");
const User = require("../model/userModel")


//create group
const creategroup = asyncHandler(async (req, res) => {
    const { UserRole} = req.body;
    const {group_name} = req.body;
   
    if ((UserRole === 'Admin')) {
        res.status(400)
        throw new Error('You are authorized to create a group');
    }
    
        const groupExist = await Group.findOne({ group_name });
        if (groupExist) {
            res.status(400)
            throw new Error('Group already exists');
        }
        const group = await Group.create({group_name});
        res.status(201).json(group);
    }
)


//     if (!group_name) {
//         res.status(400);
//         throw new Error("All Fields are Mandatory");
//     }

//     //check if user exists
//     const groupExists = await Group.findOne({ group_name });
//     if (groupExists) {
//         res.status(400);
//         throw new Error("Group already exists");
//     }

    //Create the group
    // const group = await Group.create({ group_name })
    // res.status(201).json(group);
    // });


//get all the group
const getgroup = asyncHandler(async (req, res) => {
    const group = await Group.find({})
    res.status(200).json(group);
});


//get group by id
const getgroupid = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) {
        res.status(404);
        throw new Error("Group is not found");
    }
    const getgroupid = await Group.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(getgroupid);
});


//update a group by  id
const updategroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) {
        res.status(404);
        throw new Error("Group not found");
    }
    const updategroup = await Group.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updategroup);
});


//Delet a group
const deletegroup = asyncHandler(async (req, res) => {
    const group = await Group.findById(req.params.id);
    if (!group) {
        res.status(404);
        throw new Error("Group not found");
    }
    const deletegroup = await Group.findByIdAndDelete(req.params.id);
    res.status(200).json(deletegroup);
});


module.exports = {
    creategroup,
    getgroup,
    getgroupid,
    updategroup,
    deletegroup,
}