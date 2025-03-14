// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const Registration = require("../controllers/Registration")

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5000000 }, // 5MB limit
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png/;
//         const mimeType = fileTypes.test(file.mimetype);
//         const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//         if (mimeType && extname) {
//             return cb(null, true);
//         } else {
//             cb('Error: Only image is allowed!');
//         }
//     }
// });

// router.post('/upload', upload.single('E_Invoice'), Registration.createregistration);

// module.exports = router;
