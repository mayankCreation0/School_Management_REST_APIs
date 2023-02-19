const models = require('../models/adminSchema')
const teacherModels = require('../models/teachersSchema')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const adminsignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await models.findOne({
            email: email,
        });
        if (existingUser) {
            return res.status(400).json("User Already Registered");
        }
        const hashedPassword = await bcrypt.hash(password, 11);
        const result = await models.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        res.status(201).json({ user: result });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "something went wrong" });
    }
};
const adminlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await models.findOne({ email: email });
        if (!existingUser) {
            return res.status(500).json({ message: "User not found" });
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(500).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            process.env.SECRET_KEY
        );
        res.status(201).json({ user: existingUser, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong" });
    }
};
const adminaccess = async (req, res) => {
    try {
        const teachers = await teacherModels.find().select("-password")
        return res.status(200).json(teachers);
    } catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
}
const adminaccessbyID = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const existingTeacher = await teacherModels.findById(id);
        const result = new Date()
        const filterdate = existingTeacher.attendance.find(e => e.date === result.toISOString().substring(0, 10))
        return res.status(201).json(filterdate)
    } catch (error) {
        console.log(error)
    }
}
const markAttendance = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const existingTeacher = await teacherModels.findByIdAndUpdate(id, { $push: { attendance: req.body } }, { new: true });
        console.log(existingTeacher);
        return res.status(201).json(existingTeacher)
    } catch (error) {
        console.log(error)
    }
}
const getTeacherAttendance = async (req, res) => {
    try {
        const { id, month, year } = req.params;
        const existingTeacher = await teacherModels.findById(id);
        const attendance = existingTeacher.attendance.filter(
            el=>(el.date.substring(0,4)===year&&el.date.substring(5,7)===month)
        );
        res.status(200).json({ attendance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
const calculateSalary = async (req, res) => {
    try {
        const { id, month, year } = req.params;
        const teacher = await teacherModels.findById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        const { salary, attendance } = teacher;
        const totalDays = attendance.length;
        const presentDays = attendance.filter(a => a.status === 'present').length;
        const halfDays = attendance.filter(a => a.status === 'half day').length / 2;
        const absentDays = totalDays - presentDays - Math.ceil(halfDays);
        const leavesTaken = teacher.leavesTaken;
        const paycut = Math.max(absentDays - leavesTaken - 3, 0);
        const salaryForMonth = (salary / 30) * (presentDays + halfDays) - paycut;
        res.json({ salary: salaryForMonth });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    adminlogin,
    adminsignup,
    adminaccess, adminaccessbyID, markAttendance, getTeacherAttendance, calculateSalary
};
