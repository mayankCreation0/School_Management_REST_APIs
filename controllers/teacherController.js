// const loginModel = require('../models/teacherLoginSchema');
const signupModel = require('../models/teachersSchema');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingTeacher = await signupModel.findOne({ email: email });
        if (!existingTeacher) {
            return res.status(404).json({ message: 'User not found' });
        }
        const checkpassword = await bcrypt.compare(password, existingTeacher.password);
        if (!checkpassword) {
            return res.status(401).json({ message: "Invalid password" })
        }
        return res.status(200).json({ message: "login successful" })
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: 'Something went wrong' });
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingTeacher = await signupModel.findOne({ email: email });
        if (existingTeacher) {
            return res.status(400).json({ message: 'Teacher already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 11);
        const result = await signupModel.create({
            name: name,
            email: email,
            password: hashedPassword,
        });
        return res.status(201).json({ result: result });
    } catch (error) {
        res.status(501).json({ message: error.message });
        console.log(error)
    }
}
const teacherData = async(req,res)=>{
    try {
        const id = req.params.id; 
        console.log(id)
        // const { date,status} = req.body;
        
        const existingTeacher = await signupModel.findByIdAndUpdate(id, { $push: { attendance:req.body}},{new:true} );
        console.log(existingTeacher);
        return res.status(201).json(existingTeacher)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    login, signup,teacherData
}