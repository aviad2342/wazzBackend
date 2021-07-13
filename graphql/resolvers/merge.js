const User = require('../../models/user');
const Message = require('../../models/message');

const { dateToString } = require('../../helpers/date');

const message = async messageIds => {
    try {
      const messages = await Message.find({ _id: { $in: messageIds } });
      return messages.map(message => {
        return {
          ...message._doc,
          _id: message.id,
          from: user.bind(this, message.from),
          to: user.bind(this, message.to),
          date: dateToString(message._doc.date),
          body: message.body,
        };
      });
    } catch (err) {
      throw err;
    }
  };


  const user = async userId => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        _id: user.id,
        phone : user.phone,
        name: user.name,
        avatar: user.avatar,
      };
    } catch (err) {
      throw err;
    }
  };

  const messageUser = async userId => {
    try {
      const user = await User.findById(userId);
      return {
        ...user._doc,
        phone : user.phone,
        name: user.name,
        avatar: user.avatar,
      };
    } catch (err) {
      throw err;
    }
  };

  const userByPhone = async userPhone => {
    try {
      let user = await User.findOne({phone: userPhone});
      console.log(transformUser(user));
      return transformUser(user);
    } catch (err) {
      throw err;
    }
  };

  const transformChat = chat => {
    return {
      ...chat._doc,
      _id: chat._id,
      id: chat.id,
      messages: message.bind(this, chat.messages)
    };
  };

  const transformMessage = message => {
    return {
      ...message._doc,
      _id: message._id,
      from: user.bind(this, message.from),
      to: user.bind(this, message.to),
      date: dateToString(message._doc.date),
      body: message.body,
    };
  };

  const transformUser = user => {
    return {
      ...user._doc,
      _id: user._id,
      phone : user.phone,
      name: user.name,
      avatar: user.avatar
    };
  };
  

  exports.user = user;
  exports.userByPhone = userByPhone;
  exports.message = message;
  exports.transformChat = transformChat;
  exports.transformMessage = transformMessage;
  