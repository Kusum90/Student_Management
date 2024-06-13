const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    // notice_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: "Notice"
    // },
    title: 
    { 
        type: String, 
        required: true 
    },
    Description:{
        type: String,
        required: true
    },
    Date:{
        type:String,
        required:true
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Notice', noticeSchema);
