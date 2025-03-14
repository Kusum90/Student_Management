const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const developerSchema = new Schema({
    task:
    {
        type: String,
        required: true
    },
    Description:
    {
        type: String,
        required: true
    },
    file:
    {
        type: Array,
    },
    Assigned_Date:
    {
        type: String,
        required: true
    },
    Submission_Date:
    {
        type: String,
        required: true
    },
    Group:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Group",
       
    },
    intern_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'INTERN', 
        
    }]

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Developer', developerSchema);
