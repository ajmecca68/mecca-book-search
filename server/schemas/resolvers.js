const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Query to return the logged-in user's data
    me: async (_, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      const foundUser = await User.findOne({ _id: context.user._id }).populate('savedBooks');
      return foundUser;
    },
  },

  Mutation: {
    // Mutation for user login
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Wrong password!');
      }

      const token = signToken(user);

      return { token, user };
    },

    // Mutation for adding a user
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      if (!user) {
        throw new Error('Something went wrong with adding the user!');
      }
      const token = signToken(user);
      return { token, user };
    },

    // Mutation for saving a book
    saveBook: async (_, { input }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedBooks: input } },
        { new: true, runValidators: true }
      ).populate('savedBooks');

      return updatedUser;
    },

    // Mutation for removing a book
    removeBook: async (_, { bookId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      ).populate('savedBooks');

      return updatedUser;
    },
  },
};

module.exports = resolvers;
