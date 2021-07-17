const Chat = require("../models/chat");
const { fetchChatMessages } = require("./message.data");

const fetchChats = async () => {
    try {
      const chats = await Chat.find();
      return chats.map(chat => {
        return {
            ...chat._doc,
            _id: chat._id,
            id: chat.id,
            messages: fetchChatMessages(chat.messages)
          };
      });
    } catch (err) {
      throw err;
    }
  };

  const fetchChat = async chatId => {
    try {
     const chat = await Chat.findOne({id: chatId});
      if (!chat) {
        return addChat(chatId);
      }
      return {
        ...chat._doc,
        _id: chat._id,
        id : chat.id,
        messages: fetchChatMessages(chat.messages)
      };
    } catch (err) {
      throw err;
    }
  };

  const addChat = async chatId => {
    try {
        const newChat = new Chat({
            id: chatId
        });
        const result = await newChat.save();
        return {
            ...result._doc,
            _id: result._doc._id.toString(),
            id: result._doc.id.toString(),
            messages: result._doc.messages
          };
    } catch (err) {
      throw err;
    }
  };


  exports.fetchChats = fetchChats;
  exports.fetchChat = fetchChat;
  exports.addChat = addChat;