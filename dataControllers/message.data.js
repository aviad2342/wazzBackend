const Message = require("../models/message");
const Chat = require("../models/chat");
const { dateToString } = require("../helpers/date");
const { fetchUser, fetchUserById } = require("./user.data");


const fetchMessages = async () => {
    try {
      const messages = await Message.find();
      return messages.map(message => {
        return {
            ...message._doc,
            _id: message._doc._id,
            from: fetchUserById(message.from),
            to:  fetchUserById(message.to),
            date: dateToString(message._doc.date),
            body: message.body
          };
      });
    } catch (err) {
      throw err;
    }
  };

  const fetchMessage = async messageId => {
    try {
      const message = await Message.findById(messageId);
      return {
        ...message._doc,
        _id: message._id,
        from : fetchUserById(message.from),
        to : fetchUserById(message.to),
        date: dateToString(message.date),
        body: message.body
      };
    } catch (err) {
      throw err;
    }
  };

  const fetchChatMessages = async messageIds => {
    try {
        const messages = await Message.find({ _id: { $in: messageIds } });
        return messages.map(message => {
          return {
            ...message._doc,
            _id: message.id,
            from: fetchUserById(message.from),
            to: fetchUserById(message.to),
            date: dateToString(message._doc.date),
            body: message.body
          };
        });
      } catch (err) {
        throw err;
      }
  };

  const addMessage = async (chatId, from, to, date, body) => {
    try {
        const chat = await Chat.findById(chatId);

        const message = new Message({
          from: await fetchUser(from),
          to: await fetchUser(to),
          date: dateToString(date),
          body,
        });
        const result = await message.save();
        chat.messages.push(result);
        // pubsub.publish('MESSAGE_CREATED', { messageCreated: args });
        chat.save();
        return transformMessage(result);
      } catch (err) {
        throw err;
      }
  };


  const transformMessage = message => {
    return {
      ...message._doc,
      _id: message._id,
      from: fetchUserById(message.from),
      to: fetchUserById(message.to),
      date: dateToString(message.date),
      body: message.body,
    };
  };

  exports.fetchMessages = fetchMessages;
  exports.fetchMessage = fetchMessage;
  exports.fetchChatMessages = fetchChatMessages;
  exports.addMessage = addMessage;