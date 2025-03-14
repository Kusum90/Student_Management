const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    
    Offer_Latter: {
        type: String,
    },
    Joinning_Latter: {
        type: String,
    },
    LOI: {
        type: String,
    },
    LOR: {
        type: String,
    },
    Acknowldge_Latter: {
        type: String,
    },
    Course_Certification: {
        type: String,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Document', DocumentSchema);
