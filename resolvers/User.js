const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken, verifyToken } = require('../utils/auth');




const resolvers = {
    Query: {
        listEmployees: async (_, { page = 1, limit = 10, sort = 'name', role, name, minAge, maxAge }) => {
            const skip = (page - 1) * limit;
          
            const query = {};
            if (role) query.role = role;
            if (name) query.name = { $regex: name, $options: 'i' }; 
            if (minAge || maxAge) query.age = { ...(minAge && { $gte: minAge }), ...(maxAge && { $lte: maxAge }) };
          
            return await User.find(query).sort({ [sort]: 1 }).skip(skip).limit(limit);
          },
        
        employeeDetails: async (_, { id }, { user }) => {
            if (!user) {
                throw new Error('Unauthorized');
            }
            return await User.findById(id);
        },
    },
    Mutation: {
        
        register: async (_, { input }) => {
            const { email, password, role, name, age, attendance, subjects } = input;
        
           
            const hashedPassword = await bcrypt.hash(password, 10);
        
           
            const user = new User({
                email,
                password: hashedPassword,
                role,
                name,
                age,
                attendance: attendance || undefined,  
                subjects: subjects || []           
            });
        
          
            await user.save();
        
          
            return { token: generateToken(user), user };
        },
        
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) throw new Error('Invalid credentials');

            return { token: generateToken(user), user };
        },
        updateEmployee: async (_, { id, ...updates }, { user }) => {
            console.log("user",user);
            if (!user || user.role !== 'admin') {
                throw new Error('Unauthorized');
            }
            console.log("1");
            if (updates.role && updates.role === 'admin' && user.role !== 'superadmin') {
                throw new Error('Only superadmin can assign admin roles.');
            }
        let ans= await User.findByIdAndUpdate(id, updates, { new: true });
        console.log({ans});
        return ans;
     
        },
        
    },
};

module.exports = resolvers;
