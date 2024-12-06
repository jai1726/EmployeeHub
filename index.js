const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const { verifyToken } = require('./utils/auth');
const typeDefs = require('./typeDefs/User');
const resolvers = require('./resolvers/User');

dotenv.config();
connectDB();

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        try {
            if (token) {
                const user = verifyToken(token.replace('Bearer ', '')); 
                console.log(user);
                return { user };
            }
        } catch (error) {
            console.error('Error verifying token:', error.message);
        }
        return {}; 
    },
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
