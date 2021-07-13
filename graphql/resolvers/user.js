const User = require("../../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return {
          ...user._doc,
          _id: user.id,
          phone: user.phone,
          name: user.name,
          avatar: user.avatar,
        };
      });
    } catch (err) {
      throw err;
    }
  },
  user: async ({userPhone}) => {
    try {
      const user = await User.findOne({phone: userPhone});
        return {
          ...user._doc,
          _id: user.id,
          phone: user.phone,
          name: user.name,
          avatar: user.avatar,
        };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ phone, userName }) => {
    const user = await User.findOne({ phone: phone });
    if (!user) {
      throw new Error("User does not exist!");
    }
    if (userName !== user.name) {
      throw new Error("Name is incorrect!");
    }
    const token = jwt.sign(
      { userId: user.id, phone: user.phone },
      "somesupersecretkey",
      { expiresIn: "1h" }
    );
    return {
      userId: user._id,
      phone: user.phone,
      name: user.name,
      avatar: user.avatar,
      token: token,
      tokenExpiration: 3600
    };
  },
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ phone: args.userInput.phone });
      if (existingUser) {
        throw new Error("User exists already.");
      }
      const user = new User({
        phone: args.userInput.phone,
        name: args.userInput.name,
        avatar: args.userInput.avatar,
      });

      const result = await user.save();

      return { ...result._doc, name: result.name, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
