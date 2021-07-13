const Chat = require('../../models/chat');
const { dateToString } = require('../../helpers/date');
const { chatIdGenerator } = require('../../helpers/chatIdUtil');
const {user, message, transformChat} = require('./merge');



  module.exports = {
  chats: async () => {
    try {
      const chats = await Chat.find();
      return chats.map(chat => {
        return transformChat(chat);
      });
    } catch (err) {
      throw err;
    }
  },
  chat: async ({chatId}) => {
    let createdChat;
    try {
        const chat = await Chat.findOne({id: chatId});
        if(!chat) {
            const newChat = new Chat({
                id: chatId
            });
            const result = await newChat.save();
            createdChat = {
                ...result._doc,
                _id: result._doc._id.toString(),
                id: result._doc.id.toString(),
                messages: message.bind(this, result._doc.messages)
              };
            return createdChat;
        }
        return transformChat(chat);
    } catch (err) {
      throw err;
    }
  },
  createChat: async (args, req) => {
    const chat = new Chat({
        id: args.chatInput.id,
        messages: args.chatInput.messages
    });
    let createdChat;
    try {
      const result = await chat.save();
    //   const from = await User.findById('60ea85e22027edd8aaa9cdec');
    //   const to = await User.findById('60ea86c52027edd8aaa9cded');
      createdChat = {
        ...result._doc,
        _id: result._doc._id.toString(),
        messages: message.bind(this, result._doc.messages)
      };
      return createdChat;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

};