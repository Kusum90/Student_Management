const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Group = require("../model/group");


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, UserRole, Group:group_id, intern_id } = req.body;

    // Check for required fields
    if (!username || !email || !password || !UserRole) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // Additional checks for 'Intern' role
    if (UserRole === 'Intern') {
        if (!Group || !intern_id) {
            res.status(400);
            throw new Error("Please add Group and intern_id for Intern Role");
        }

        // Check if Group exists
        const groupExists = await Group.findById(group_id);
        if (!groupExists) {
            res.status(400);
            throw new Error('Group does not exist');
        }
    }


    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password:", hashedPassword);

    // Create new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        UserRole,
        Group: UserRole === 'Intern' ? group_id : null,
        intern_id: UserRole === 'Intern' ? intern_id : null
    });

    console.log(`User created successfully ${user}`);
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            username: user.username,
            group: user.Group,
            intern_id: user.intern_id
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});


// const asyncHandler = require("express-async-handler");
// const User = require("../model/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// //register user
// const registerUser = asyncHandler(async (req, res) => {
//     const { username, email, password,UserRole, Group, intern_id} = req.body;
//     if (!username || !email || !password || !UserRole) {
//         res.status(400);
//         throw new Error("Please add all fields");
//     }

//     //if role is intern thn provied group
//     if (UserRole === 'Intern') {
//         if(!Group || intern_id)
//         res.status(400);
//         throw new Error("Please add Group and intern_id for Intern Role");
//     }

//      //check if group exists
//         const groupExists = await Group.findById(Group);
//         if (!groupExists) {
//             res.status(400);
//             throw new Error('Group does not exist');
//         }
//     }


//     //check if user alredy exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//         res.status(400);
//         throw new Error("User already exists");
//     }
//     //Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log("hashed password:", hashedPassword);
//     const user = await User.create({
//         username,
//         email,
//         password: hashedPassword,
//         UserRole,
//         Group
//     });
//     console.log(`User created succesfully ${user}`);
//     if (user) {
//         res.status(201).json({
//             _id: user.id, email: user.email, username: user.username, group:user.Group
//         });
//     }
//     else {
//         res.status(400);
//         throw new Error("Invalid user data");
//     }
//     // res.json({ message: "register the user" });
// });




//login user
const loginuser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const user = await User.findOne({ email });
    //compare password with hashpassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                UserRole:user.UserRole,
                id: user.id
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            });
        res.status(200).json({ accessToken });
        //res.json({ message: "login user" });
    }else{
        res.status(400);
        throw new Error("Invalid user");
    }
});


//current user info
const currentuser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

//get all the logined user
// const getuser = asyncHandler(async(req,res) => {
//     const user = await User.findById(req.params.id);
//     if(!user){
//      res.status(404);
//      throw new Error("user not found");
//     }
//      res.status(200).json (user);
//  });

//if userrole is admin then he/she can create user
const createuser = asyncHandler(async (req, res) => {
    const {UserRole} = req.user;
    if(UserRole === 'Admin'){
        const user = new User(req.body);
        const createdUser = await user.save();
        res.status(201).json({ createdUser });
        }else{
            res.status(401);
            throw new Error("You are not authorized to create user");
            }
            });


//uopdate all the user ny user id
const updateuser = asyncHandler(async (req, res) => {
    const update = await User.findById(req.params.id);
    if (!update) {
        res.status(404);
        throw new Error("user  not found");
    }
    const updateuser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updateuser);
});
        
//get all the user
const getuser = asyncHandler(async (req, res) => {
    const user = await User.find({})
    res.status(200).json(user);
});

//get notice by user_id
const getuserbyid = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User is not found");
    }
    const getuserbyid = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(getuserbyid);
});



//update a user by user id
const updateuserbyid = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("user not found");
    }
    const updateuser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updateuser);
});

//Delet a user
const deleteuser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
   if(!user){
    res.status(404);
    throw new Error("user not found");
   }
   const  deleteuser = await Notice.findByIdAndDelete(req.params.id );
    res.status(200).json (user);
});
module.exports = {
    registerUser,
    loginuser,
    currentuser,
    getuser,
    getuserbyid,
    updateuserbyid,
    deleteuser
    
};








