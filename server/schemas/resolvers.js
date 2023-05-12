const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("You must be logged in!");
      }

      const userData = await User.findById(context.user._id).select("-__v -password").populate("books");

      return userData;
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError("Incorrect login credentials!");
      }

      const token = signToken(user);

      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (parent, { bookData }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You must be logged in to save books!");
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $addToSet: { savedBooks: bookData } },
        { new: true }
      ).populate("books");

      return updatedUser;
    },

    removeBook: async (parent, { bookId }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You must be logged in to delete books!");
      }

      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      );

      return updatedUser;
    },
  },
};

module.exports = resolvers;