const User = require("../models/user");
const jwt = require("jsonwebtoken");

const fetchUsers = async () => {
    try {
      const users = await User.find();
      return users.map(user => {
        return {
            ...user._doc,
            _id: user._id,
            phone : user.phone,
            name : user.name,
            avatar: user.avatar
          };
      });
    } catch (err) {
      throw err;
    }
  };

  const fetchUser = async (userPhone) => {
    try {
      const user = await User.findOne({phone: userPhone});
      return {
        ...user._doc,
        _id: user._id,
        phone : user.phone,
        name : user.name,
        avatar: user.avatar
      };
    } catch (err) {
      throw err;
    }
  };

  const fetchUserById = async userId => {
    try {
        const user = await User.findById(userId);
        return {
          ...user._doc,
          _id: user._id,
          phone : user.phone,
          name : user.name,
          avatar: user.avatar
        };
      } catch (err) {
        throw err;
      }
  };

  const loginUser = async (phone, userName ) => {
    try {
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
      } catch (err) {
        throw err;
      }
  };

  const addUser = async (userPhone, name, avatar) => {
    try {
        const existingUser = await User.findOne({ phone: userPhone });
        if (existingUser) {
          throw new Error("User exists already.");
        }
        const user = new User({
          phone: userPhone,
          name,
          avatar
        });
  
        const result = await user.save();
  
        return { ...result._doc, _id: result.id, phone: result.phone, name: result.name, avatar: result.avatar };
      } catch (err) {
        throw err;
      }
  };


  exports.fetchUsers = fetchUsers;
  exports.fetchUser = fetchUser;
  exports.fetchUserById = fetchUserById;
  exports.loginUser = loginUser;
  exports.addUser = addUser;
