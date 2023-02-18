const express = require('express');
const { login, signup } = require('../controllers/teacherController')
const teacherRouter = express.Router();;

teacherRouter.post('/teacherlogin', login)
teacherRouter.post("/teachersignup", signup);

module.exports = teacherRouter;