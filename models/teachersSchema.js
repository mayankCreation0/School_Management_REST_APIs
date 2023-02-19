const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema(
    {
        name: { type: 'String' },
        email: { type: 'String', required: true },
        password: { type: 'String',required: true },
        salaryperday: { type: 'String'},
        salary: {
            type: Number,
            default:30000
        },
        leavesTaken: {
            type: Number,
            default: 0
        },
        attendance: [{
            date: {
                type: String,
                default: () => new Date().toISOString().substring(0, 10)
            },
            status: {
                type: String,
                enum: ['present', 'half day', 'absent'],
                default: 'absent'
            }
        }],
        flag:{type: 'boolean',default: false}
    }
)
module.exports = mongoose.model('teacher', teacherSchema);