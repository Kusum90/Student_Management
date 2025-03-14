const mongoose = require('mongoose');

const internAssignmentSchema = new mongoose.Schema({
    Intern_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'INTERN',
    },
    Developer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Developer",
        required:true
    },
    Task_Title:
    {
        type:String,
        required:true
    },
    Task_Description:{
        type:String,
        required:true
        },
    githubUrl: 
    {
         type: String ,
         required: true
        },
    submit_date: 
    { 
        type: String, 
        required: true 
    },

},
{
    timestamps: true
}
);

module.exports = mongoose.model('InternAssignment', internAssignmentSchema);