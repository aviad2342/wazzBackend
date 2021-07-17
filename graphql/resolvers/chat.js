const Chat = require('../../models/chat');
const {fetchChats, fetchChat, addChat} = require('../../dataControllers/chat.data');


  module.exports = {
  chats: async () => {
    try {
      return fetchChats();
    } catch (err) {
      throw err;
    }
  },
  chat: async ({chatId}) => {
    try {
      return fetchChat(chatId);
    } catch (err) {
      throw err;
    }
  },
   //Mutation
  createChat: async ({chatId}) => {
    try {
      return addChat(chatId);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

};