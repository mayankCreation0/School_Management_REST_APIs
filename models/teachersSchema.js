const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema(
    {
        name: { type: 'String' },
        email: { type: 'String', required: true },
        password: { type: 'String',required: true },
        salary: {
            type: Number,
            required: true
        },
        leavesTaken: {
            type: Number,
            default: 0
        },
        attendance: [{
            date: {
                type: String,
                default: Date.now
            },
            status: {
                type: String,
                enum: ['present', 'half day', 'absent'],
                default: 'absent'
            }
        }]
    }

)
module.exports = mongoose.model('teacher', teacherSchema);