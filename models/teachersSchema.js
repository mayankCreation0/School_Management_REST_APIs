const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema(
    {
        name: {type:'String',required:true},
        email: { type: 'String', required: true },
        password: { type: 'String', required: true }, 
        leavesTaken: [{
            month: Number,
            year: Number,
            taken: Number, 
        }],
        attendance: [{
            date: Date,
            status: String, 
        }],
    }
)
module.exports = mongoose.model('teacher',teacherSchema);