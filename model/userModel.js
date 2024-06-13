const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    intern_id:{
        type: String,
        default:null
    },
    username: {
        type: String,
        required: [true, "please add the username"]
    },
    email: {
        type: String,
        required: [true, "please add the email"]
    },
    password:
    {
        type: String,
        required: [true, "please add the password"]
    },
    UserRole:{
        type: String,
        enum: ['Admin', 'Hr', 'Developer','Intern'],
        required:[true,"please add the UserRole"]
    },
    Group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group",
        default:null,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("User", userSchema);
