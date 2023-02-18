const express = require('express');
const { login, signup, teacherData } = require('../controllers/teacherController')
const teacherRouter = express.Router();;

teacherRouter.post('/teacherlogin', login)
teacherRouter.post("/teachersignup", signup);
teacherRouter.put("/teacherdata/:id", teacherData)

module.exports = teacherRouter;