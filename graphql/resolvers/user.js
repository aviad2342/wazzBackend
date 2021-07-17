const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { fetchUsers, fetchUserById, fetchUser, loginUser, addUser } = require("../../dataControllers/user.data");

module.exports = {
  users: async () => {
    try {
      return fetchUsers();
    } catch (err) {
      throw err;
    }
  },
  user: async ({userPhone}) => {
    try {
      return fetchUser(userPhone);
    } catch (err) {
      throw err;
    }
  },
  userById: async ({userId}) => {
    try {
      return fetchUserById(userId);
    } catch (err) {
      throw err;
    }
  },
  login: async ({ phone, userName }) => {
    try {
      return loginUser(phone, userName);
    } catch (err) {
      throw err;
    }
    // const user = await User.findOne({ phone: phone });
    // if (!user) {
    //   throw new Error("User does not exist!");
    // }
    // if (userName !== user.name) {
    //   throw new Error("Name is incorrect!");
    // }
    // const token = jwt.sign(
    //   { userId: user.id, phone: user.phone },
    //   "somesupersecretkey",
    //   { expiresIn: "1h" }
    // );
    // return {
    //   userId: user._id,
    //   phone: user.phone,
    //   name: user.name,
    //   avatar: user.avatar,
    //   token: token,
    //   tokenExpiration: 3600
    // };
  },
   //Mutation
  createUser: async (args) => {
    try {
      return addUser(
        args.userInput.phone,
        args.userInput.name,
        args.userInput.avatar
      );
    } catch (err) {
      throw err;
    }
  },
};
