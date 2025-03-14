const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
    Fullname: {
        type: String,
        required: [true, "please add fullname"]
    },
    email: {
        type: String,
        required: [true, "please add the email"]
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
        type: String,
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
    

},
    {
        timestamps: true
    })

module.exports = mongoose.model("Profile", ProfileSchema);
