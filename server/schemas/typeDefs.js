// const { gql } = require('apollo-server-express');

const typeDefs = `
  # Define a type for the Book
  type Book {
    bookId: ID!
    title: String
    authors: [String]
    description: String
    image: String
    link: String
  }

  # Define a type for the User
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  # Define a type for the Auth payload
  type Auth {
    token: ID!
    user: User
  }

  # Queries
  type Query {
    me: User
  }

  # Input type for saving a book
  input SaveBookInput {
    bookId: String!
    title: String!
    authors: [String]
    description: String
    image: String
    link: String
  }

  # Mutations
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SaveBookInput!): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
