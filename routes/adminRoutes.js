const express = require('express');
const { adminlogin, adminsignup } = require('../controllers/adminController');
const auth = require('../middlewares/Auth');
const adminRouter = express.Router();;

adminRouter.post('/login', adminlogin)
adminRouter.post("/signup", adminsignup);

module.exports = adminRouter;