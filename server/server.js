const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const AuthService = require('./auth'); // Assuming auth.js is in the same directory

// Import your type definitions and resolvers
const typeDefs = require('./schema'); // Adjust the path as necessary
const resolvers = require('./resolvers'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Use the authenticate method from AuthService to check user credentials
    const authService = new AuthService();
    try {
      authService.authenticateGraphQL(req);
      return { user: req.user };
    } catch (error) {
      console.error(error);
    }
  }
});

// Apply Apollo GraphQL middleware and set the path to /graphql
server.applyMiddleware({ app, path: '/graphql' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static assets if in production environment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Add routes
app.use(routes);

// Connect to the database
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
