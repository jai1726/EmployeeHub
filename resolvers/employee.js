const Employee = require('../models/employee');

const resolvers = {
    Query: {
        listEmployees: async (_, { page = 1, limit = 10, sort }) => {
            const skip = (page - 1) * limit;
            return await Employee.find().sort(sort).skip(skip).limit(limit);
        },
        employeeDetails: async (_, { id }) => {
            return await Employee.findById(id);
        },
    },
    Mutation: {
        addEmployee: async (_, args) => {
            const employee = new Employee(args);
            return await employee.save();
        },
        updateEmployee: async (_, { id, ...updates }) => {
            return await Employee.findByIdAndUpdate(id, updates, { new: true });
        },
    },
};

module.exports = resolvers;
