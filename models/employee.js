const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    class: { type: String },
    subjects: { type: [String] },
    attendance: { type: Number, default: 0 },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
