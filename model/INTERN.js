const mongoose = require("mongoose");

const InternSchema = mongoose.Schema({
    Fullname: {
        type: String,
        required: [true, "please add fullname"]
    },
    email: {
        type: String,
        required: [true, "please add the email"]
    },
    password:{
        type: String,

    },
    phone: {
        type: String,
        required: [true, "please add the phone number"]
    },
    address: {
        type: String,
        required: [true, "please add the address"]
    },
    image: {
        type: Array,
    },
    collage_name: {
        type: String,
        required: [true, "please add the collage name"]
    },
    collage_year: {
        type: String,
        required: [true, "please add the collage year"]
    },
    internship_tenior: {
        type: String,
        required: [true, "please add the internship tenior"]
    },
    assigned_group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        default: null,
    },
    assigned_developer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "developer",
        default: null,
    },
    Intern_Id:{
        type: String,
        required: [true, "please add the Intern_Id"]
    },UserRole:{
        type: String,
        enum: ['Intern'],
        required:[true,"please add the UserRole"]
    },
    

},
    {
        timestamps: true
    })

module.exports = mongoose.model("Intern", InternSchema);
