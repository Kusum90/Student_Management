const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    // intern_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: "Intern"
    // },
    group_name:{
        type:String,
        required:true
    },
},
{
    timestamps:true,
}
);

module.exports = mongoose.model('Group', groupSchema );
