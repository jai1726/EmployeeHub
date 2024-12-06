const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employee'], required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    class: { type: String },
    subjects: [{ type: String }],
    attendance: { type: Number, default: 0 },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
