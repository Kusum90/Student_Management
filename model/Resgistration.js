const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
    intern: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'INTERN',
    },
    Registration_Date: {
        type: String,
    },
    Registration_Amount: {
        type: String,
    },
    Pending_Amount:{
        type:Number,
    },
    Due_Date:{
        type:String,
    },
    E_Invoice :{
        type:String,
    }
}, 
{ 
    timestamps: true 
});

module.exports = mongoose.model('Registration', RegistrationSchema);
