// const express = require("express");
// const router = express.Router();
// const path = require('path')
// const bodyParser = require('body-parser')
// const multer = require('multer')
// const Task = require('../controllers/taskController')

//  router.use(bodyParser.urlencoded({extended:true}));
//  router.use(express.static(path.resolve(__dirname,'public')))

//  const storage = multer.diskStorage({});
//  var uploader = multer({
//     storage: storage,
//     limits:{fileSize:5000000}
//  });


//  router.post ('/assign',uploader.single("file"),Task.uploadfile)
 
//  module.exports =  router;

// routes/developer.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const taskController = require('../controllers/taskController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|pdf|doc|docx/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extname) {
            return cb(null, true);
        } else {
            cb('Error: Only images, PDF, and Word documents are allowed!');
        }
    }
});

router.post('/upload', upload.single('file'), taskController.createtask);

module.exports = router;
