const express = require('express');
const { adminlogin, adminsignup, adminaccess, adminaccessbyID, markAttendance, getTeacherAttendance, calculateSalary } = require('../controllers/adminController');
const auth = require('../middlewares/Auth');
const adminRouter = express.Router();;

adminRouter.post('/login', adminlogin)
adminRouter.post("/signup", adminsignup);
adminRouter.get("/admindash", auth, adminaccess);
adminRouter.get("/admindash/:id", auth, adminaccessbyID);
adminRouter.put("/teacherdata/:id", auth, markAttendance)
adminRouter.get("/teacherdata/monthly/:id/:month/:year", auth, getTeacherAttendance)
adminRouter.get("/teacherdata/salary/:id/:month/:year", auth, calculateSalary)

module.exports = adminRouter;