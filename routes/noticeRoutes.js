const express = require('express');
const router = express.Router();
const Notice = require('../model/noticeModel');
const Task = require('../model/developerModel')
const { createnotice, getnotices, updatenotice, deletenotice, getnoticebyid } = require('../controllers/noticeController');
const { createtask, gettask, updatetask, delettask, gettaskbyid, getTasksByInterns, getAllSubmittedTasks, getalltask, getsubmitedtask } = require('../controllers/taskController');
const { submittask, getsubmit, updatesubmit, deletesubmit, getsubmitid } = require('../controllers/internController');
const validateToken = require('../middlewear/validateTokenHandler');
const { hrmiddlewear, developermiddlewear, internmiddlewear, adminmiddlewear } = require('../middlewear/Admin');
const { creategroup, getgroup, getgroupid, updategroup, deletegroup, addInternToGroup } = require('../controllers/group');
const { route } = require('./userRoutes');

//create


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


module.exports = router;
