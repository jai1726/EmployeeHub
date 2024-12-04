const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Employee {
        id: ID!
        name: String!
        age: Int!
        class: String
        subjects: [String]
        attendance: Float
    }

    type Query {
        listEmployees(page: Int, limit: Int, sort: String): [Employee]
        employeeDetails(id: ID!): Employee
    }

    type Mutation {
        addEmployee(name: String!, age: Int!, class: String, subjects: [String], attendance: Float): Employee
        updateEmployee(id: ID!, name: String, age: Int, class: String, subjects: [String], attendance: Float): Employee
    }
`;

module.exports = typeDefs;
