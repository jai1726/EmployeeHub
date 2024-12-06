const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        email: String!
        role: String!
        name: String!
        age: Int!
        class: String
        subjects: [String]
        attendance: Float
    }

    input RegisterInput {
        email: String!
        password: String!
        role: String!
        name: String!
        age: Int
        class: String
        subjects: [String]
         attendance: Float
    }

    type AuthPayload {
        token: String!
        user: User
    }

    type Query {
       listEmployees(
    page: Int
    limit: Int
    sort: String
    role: String
    name: String
    minAge: Int
    maxAge: Int
  ): [User]

        employeeDetails(id: ID!): User
    }

    type Mutation {
        register(input: RegisterInput!): AuthPayload
        login(email: String!, password: String!): AuthPayload
        updateEmployee(
            id: ID!
            name: String
            age: Int
            class: String
            subjects: [String]
            attendance: Float
        ): User
    }
`;

module.exports = typeDefs;
