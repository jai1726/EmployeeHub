const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    console.log(process.env.JWT_SECRET);
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const verifyToken = (token) => {
    console.log(process.env.JWT_SECRET);
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = { generateToken, verifyToken };
