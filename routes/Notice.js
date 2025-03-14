const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const noticeController = require('../controllers/noticeController');

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

router.post('/upload', upload.single('file'), noticeController.createtask);

module.exports = router;
