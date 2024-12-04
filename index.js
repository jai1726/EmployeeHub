const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const typeDefs = require('./typeDefs/employee');
const resolvers = require('./resolvers/employee');

dotenv.config();
connectDB();

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        //authentication logic
        return { req };
    },
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();