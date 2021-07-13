const Message = require("../../models/message");
const Chat = require("../../models/chat");
const User = require("../../models/user");
const { user, userByPhone, transformMessage } = require("./merge");
const { dateToString } = require("../../helpers/date");

module.exports = {
  messages: async () => {
    try {
      const messages = await Message.find();
      return messages.map((message) => {
        return {
          ...message._doc,
          _id: message.id,
          from: message.from,
          to: message.to,
          date: dateToString(message._doc.date),
          body: message.body,
        };
      });
    } catch (err) {
      throw err;
    }
  },
  message: async ({ messageId }) => {
    try {
      const message = await Message.findById(messageId);
      return {
        ...message._doc,
        _id: message.id,
        from: user.bind(this, message.from),
        to: user.bind(this, message.to),
        date: dateToString(message._doc.date),
        body: message.body,
      };
    } catch (err) {
      throw err;
    }
  },
  newMessage: async (args) => {
    try {
      const chat = await Chat.findById(args.newMessageInput.chatId);
      const from = await User.findOne({phone: args.newMessageInput.from});
      const to = await User.findOne({phone: args.newMessageInput.to});
      
      const message = new Message({
        from: from,
        to: to,
        date: dateToString(args.newMessageInput.date),
        body: args.newMessageInput.body,
      });
      const result = await message.save();
      chat.messages.push(result);
      chat.save();
      return transformMessage(result);
    } catch (err) {
      throw err;
    }
  }
};
