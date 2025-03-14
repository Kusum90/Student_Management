const asyncHandler = require('express-async-handler');
const Registration = require("../model/Resgistration")
const {uploadfile} = require("../Helper/upload")
const fs = require('fs');

// Create a new registration
exports.createRegistration = async (req, res) => {
    try {
        const { intern, Registration_Date, Registration_Amount, Pending_Amount, Due_Date } = req.body;
        let E_Invoice = '';

        if (req.file) {
            const uploadResult = await uploadfile(req.file.path);
            E_Invoice = uploadResult.secure_url;
            fs.unlinkSync(req.file.path); // Remove the file from local storage
        } else {
            return res.status(400).json({ message: "File is mandatory" });
        }

        const newRegistration = new Registration({
            intern,
            Registration_Date,
            Registration_Amount,
            Pending_Amount,
            Due_Date: new Date(Due_Date),
            E_Invoice
        });

          // Check if user already exists
    const RegistrationExists = await Registration.findOne({ intern  });
    if (RegistrationExists) {
        res.status(400);
        throw new Error("Registered User is already exists");
    }

        const savedRegistration = await newRegistration.save();
        res.status(201).json(savedRegistration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all registrations
exports.getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find();
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get registration by ID
exports.getprofilebyid = asyncHandler(async (req, res) => {
    const profile = await Registration.findById(req.params.id);
    if (!profile) {
        res.status(404);
        throw new Error("Profile is not found");
    }
    const getprofilebyid = await Registration.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(getprofilebyid);
});


// Update an existing registration
exports.updateRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const { intern, Registration_Date, Registration_Amount, Pending_Amount, Due_Date } = req.body;
        let E_Invoice = req.body.E_Invoice;

        if (req.file) {
            const uploadResult = await uploadfile(req.file.path);
            E_Invoice = uploadResult.secure_url;
            fs.unlinkSync(req.file.path); // Remove the file from local storage
        }

        const updatedRegistration = await Registration.findByIdAndUpdate(
            id,
            {
                intern,
                Registration_Date,
                Registration_Amount,
                Pending_Amount,
                Due_Date: new Date(Due_Date),
                E_Invoice
            },
            { new: true }
        );

        if (!updatedRegistration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        res.status(200).json(updatedRegistration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a registration
exports.deleteRegistration = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRegistration = await Registration.findByIdAndDelete(id);

        if (!deletedRegistration) {
            return res.status(404).json({ message: 'Registration not found' });
        }

        res.status(200).json( deletedRegistration);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
