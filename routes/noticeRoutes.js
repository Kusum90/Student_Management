const express = require('express');
const router = express.Router();

const { createnotice, getnotices, updatenotice, deletenotice, getnoticebyid } = require('../controllers/noticeController');
const { createtask, gettask, updatetask, delettask, gettaskbyid } = require('../controllers/taskController');
const { submittask, getsubmit, updatesubmit, deletesubmit, getsubmitid } = require('../controllers/internController');
const validateToken = require('../middlewear/validateTokenHandler');
const { hrmiddlewear, developermiddlewear, internmiddlewear, adminmiddlewear, program_Manager, admin_programmangermiddlewear } = require('../middlewear/Admin');
const { creategroup, getgroup, getgroupid, updategroup, deletegroup, getInternsByGroupId } = require('../controllers/group');

const multer = require('multer');
const { createintern, getIntern, getInternid, updateIntern, deleteIntern, getInternprofile, getallIntern } = require('../controllers/internProfile');
const {  addAttendance, calculateAttendance, getAttendencesByDate, getAttendanceByMonth, getAttendanceByWeek } = require('../controllers/Attendece');
const { createRegistration, updateRegistration, deleteRegistration, getAllRegistrations, getRegistrationById, getprofilebyid } = require('../controllers/Registration');
const {upload,remove} = require('../controllers/Cloudinary');
const { createdIntern, loginIntern, getinternByRole, currentintern, getinternbyid, updateinternbyid, deleteintern } = require('../controllers/INTERN');
const sendSMS = require('../Helper/SendSMS');
const { createCourse, getCourseById, getAllCoursess, updateCourse, deleteCourse } = require('../controllers/Course');
const { createAcademicsPage, getAcademicsPageByInternId, updateEnrolledCourses, getAllCourses } = require('../controllers/AcademicsPage');
const { createDocument, getDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } = require('../controllers/Document');


//notice
router.post("/create",[validateToken,hrmiddlewear],createnotice);
router.get('/create',getnotices);
router.get("/create/:id",[validateToken,hrmiddlewear],getnoticebyid);
router.put("/create/:id",[validateToken,hrmiddlewear],updatenotice);
router.delete("/create/:id",deletenotice);

//task
router.post("/assign",[validateToken,developermiddlewear],createtask);
router.get("/assign",gettask);
router.get("/assign/:id",[validateToken,developermiddlewear],gettaskbyid);
router.put("/assign/:id",[validateToken,developermiddlewear],updatetask);
router.delete("/assign/:id",[validateToken,developermiddlewear],delettask);

router.get ("/assign/submit",[validateToken,developermiddlewear],gettask)
router.post ("/assign/submit",[validateToken,developermiddlewear],gettask)

///assignment
router.post("/submit",[validateToken,internmiddlewear],submittask);
router.get("/submit",getsubmit);
router.get("/submit/:id",[validateToken,internmiddlewear],getsubmitid)
router.put("/submit/:id",[validateToken,internmiddlewear],updatesubmit);
router.delete("/submit/:id",[validateToken,internmiddlewear],deletesubmit)

// router.post("/submit",[validateToken,developermiddlewear], getTasksByInterns);
//group
router.post("/creatgr",[validateToken,adminmiddlewear],creategroup);
router.get("/creatgr",[validateToken,adminmiddlewear],getgroup);
router.get("/creatgr/:id",[validateToken,adminmiddlewear],getgroupid);
router.put("/creatgr/:id",[validateToken,adminmiddlewear],updategroup);
router.delete("/creatgr/:id",[validateToken,adminmiddlewear],deletegroup);
router.get('/:groupId',[validateToken,adminmiddlewear],getInternsByGroupId)

//intern profile
router.post("/createI",[validateToken,program_Manager],createintern);
router.get("/createI",[validateToken,program_Manager],getallIntern);
router.get("/createI/:id",[validateToken,program_Manager],getInternid);
router.put("/createI/:id",[validateToken,program_Manager],updateIntern);
router.delete("/createI/:id",[validateToken,program_Manager],deleteIntern);

//attendance
router.post('/add',[validateToken,hrmiddlewear],addAttendance);
router.post('/calculate',[validateToken,hrmiddlewear],calculateAttendance);
// router.get('/:date',[validateToken,hrmiddlewear],getAttendencesByDate);
// router.get('/:year/:month',[validateToken,hrmiddlewear],getAttendanceByMonth);
// router.get('/:year/:week',[validateToken,hrmiddlewear],getAttendanceByWeek);


//Registration
router.post('/', [validateToken,admin_programmangermiddlewear], createRegistration);
router.put('/:id', [validateToken,admin_programmangermiddlewear], updateRegistration);
router.delete('/:id',[validateToken,admin_programmangermiddlewear], deleteRegistration);
router.get('/',[validateToken,admin_programmangermiddlewear], getAllRegistrations);
router.get('/:id',[validateToken,admin_programmangermiddlewear],getprofilebyid);


//Cloudinary
router.post('/upload',upload);
router.get('/remove',remove);

//Intern 
router.post('/INTERN',[validateToken,program_Manager],createdIntern);
router.post("/login",loginIntern);
router.get("/role/:role",getinternByRole)
router.get ("/current",currentintern);
router.get("/current/:id",getinternbyid);
router.put("/:id",updateinternbyid);
router.delete("/:id",deleteintern);

// //sendSMS
// router.post('/sendSMS',sendSMS);


//Courses
router.post('/createC',[validateToken,adminmiddlewear],createCourse);
router.get('/createC/:id',[validateToken,adminmiddlewear],getCourseById);
router.put('/createC/:id',[validateToken,adminmiddlewear],updateCourse);
router.delete('/createC/:id',[validateToken,adminmiddlewear],deleteCourse);
//Academicspage
router.post('/academicsPage', createAcademicsPage);
router.get('/academicsPage/:internId', getAcademicsPageByInternId);
router.put('/academicsPage/:internId', updateEnrolledCourses);
router.get('/courses', getAllCourses);

//Document
router.post('/document', createDocument);
router.get('/document', getDocuments);
router.get('/document/:id', getDocumentById);
router.put('/document/:id', updateDocument);
router.delete('/document/:id', deleteDocument);


module.exports = router;
