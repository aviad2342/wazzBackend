const { subscribe } = require("../../routes/user");
const { PubSub } = require('graphql-subscriptions');
const { fetchChatMessages, fetchMessage, fetchMessages, addMessage } = require("../../dataControllers/message.data");
const pubsub = new PubSub();

pubsub.publish('MESSAGE_CREATED', {
  messageCreated: {
    author: 'Ali Baba',
    comment: 'Open sesame'
  }
});

module.exports = {
  messages: async () => {
    try {
      return fetchMessages();
      // const messages = await Message.find();
      // return messages.map((message) => {
      //   return {
      //     ...message._doc,
      //     _id: message.id,
      //     from: message.from,
      //     to: message.to,
      //     date: dateToString(message._doc.date),
      //     body: message.body,
      //   };
      // });
    } catch (err) {
      throw err;
    }
  },
  message: async ({ messageId }) => {
    try {
      return fetchMessage(messageId);
    } catch (err) {
      throw err;
    }
  },
  chatMessages: async ({ messageIds }) => {
    try {
      return fetchChatMessages(messageIds);
    } catch (err) {
      throw err;
    }
  },
  //Mutation
  newMessage: async (args) => {
    try {
      return addMessage(
        args.newMessageInput.chatId,
        args.newMessageInput.from,
        args.newMessageInput.to,
        args.newMessageInput.date,
        args.newMessageInput.body
      );
    } catch (err) {
      throw err;
    }
  }
  // ,
  // Subscription: {
  //   messageCreated:{ 
  //     subscribe: () => pubsub.asyncIterator(['MESSAGE_CREATED'])
  //   }
  // }





};
