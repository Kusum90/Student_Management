const mongoose = require('mongoose');

const internAssignmentSchema = new mongoose.Schema({
    Intern_id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Intern',
    },
    Developer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Developer",
        required:true
    },
    // task_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref: "Developer",
    //     required:true
    // },
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