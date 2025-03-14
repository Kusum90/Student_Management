const express = require("express");
const { registerUser, loginuser, currentuser, getuser, createuser, updateuser, deleteuser, updateuserbyid, getuserbyid, getUsersByRole } = require("../controllers/userControllers");
const validateToken = require("../middlewear/validateTokenHandler");
const { adminmiddlewear } = require("../middlewear/Admin");
const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginuser);

router.get("/role/:role",[validateToken,adminmiddlewear],getUsersByRole)
router.get ("/current",[validateToken,adminmiddlewear],currentuser);

router.get("/current/:id",[validateToken,adminmiddlewear],getuserbyid);
router.get("/all",[validateToken,adminmiddlewear],getuser);

router.put("/:id",[validateToken,adminmiddlewear],updateuserbyid);

router.delete("/:id",[validateToken,adminmiddlewear],deleteuser);

module.exports = router;