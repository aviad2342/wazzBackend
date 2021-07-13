const chatResolver = require('./chat');
const userResolver = require('./user');
const messageResolver = require('./message');

const rootResolver = {
    ...chatResolver,
    ...userResolver,
    ...messageResolver
};
module.exports = rootResolver;
// const message = async messageIds => {
//   try {
//     const messages = await Message.find({ _id: { $in: messageIds } });
//     messages.map(message => {
//       return {
//         ...message._doc,
//         _id: message.id,
//         from: user.bind(this, message.from),
//         to: user.bind(this, message.to),
//         date: dateToString(message._doc.date),
//         body: message.body,
//       };
//     });
//     return messages;
//   } catch (err) {
//     throw err;
//   }
// };

// const transformChat = chat => {
//     return {
//       ...chat._doc,
//       _id: chat._id,
//       id: chat.id,
//       from: user.bind(this, chat.from),
//       to: user.bind(this, chat.to),
//       messages: message.bind(this, chat.messages)
//     };
//   };

// const chat = async chatId => {
//   try {
//     const chat = await Chat.findById(chatId).populate('messages');
//     return {
//       ...chat._doc,
//       _id: chat.id,
//       from: chat.from,
//       to: chat.to,
//       messages: message.bind(this, chat.messages)
//     };
//   } catch (err) {
//     throw err;
//   }
// };

// const user = async userId => {
//   try {
//     const user = await User.findById(userId);
//     return {
//       ...user._doc,
//       _id: user.id,
//       phone : user.phone,
//       name: user.name,
//       avatar: user.avatar,
//     };
//   } catch (err) {
//     throw err;
//   }
// };

// const userByPhone = async userPhone => {
//     try {
//       const user = await User.findOne({phone: userPhone});
//       return {
//         ...user._doc,
//         _id: user.id,
//         phone : user.phone,
//         name: user.name,
//         avatar: user.avatar,
//       };
//     } catch (err) {
//       throw err;
//     }
//   };

// module.exports = {
//     messages: async () => {
//     try {
//       const messages = await Message.find();
//       return messages.map(message => {
//         return {
//           ...message._doc,
//           _id: message.id,
//           from: message.from,
//           to: message.to,
//           date: dateToString(message._doc.date),
//           body: message.body,
//         };
//       });
//     } catch (err) {
//       throw err;
//     }
//   },
//   chats: async () => {
//     try {
//       const chats = await Chat.find();
//       return chats.map(chat => {
//         return transformChat(chat);
//       });
//     } catch (err) {
//       throw err;
//     }
//   },
//   chat: async chatId => {
//     try {
//         const chat = await Chat.findOne({id: chatId}).populate('messages');
//         return transformChat(chat);
//     } catch (err) {
//       throw err;
//     }
//   },
//   users: async () => {
//     try {
//       const users = await User.find();
//       return users.map(user => {
//         return {
//           ...user._doc,
//           _id: user.id,
//           phone: user.phone,
//           name: user.name,
//           avatar: user.avatar
//         };
//       });
//     } catch (err) {
//       throw err;
//     }
//   },
//   createChat: async args => {
//     const from = await User.findById('60ea85e22027edd8aaa9cdec');
//     const to = await User.findById('60ea86c52027edd8aaa9cded');
//     const chat = new Chat({
//         id: args.chatInput.id,
//         from,
//         to,
//         messages: args.chatInput.messages
//     });
//     let createdChat;
//     try {
//       const result = await chat.save();
//     //   const from = await User.findById('60ea85e22027edd8aaa9cdec');
//     //   const to = await User.findById('60ea86c52027edd8aaa9cded');
//       createdChat = {
//         ...result._doc,
//         _id: result._doc._id.toString(),
//         from:  user.bind(this, result._doc.from),
//         to: user.bind(this, result._doc.to),
//         messages: message.bind(this, result._doc.messages)
//       };
//       return createdChat;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   },
//   createUser: async args => {
//     try {
//       const existingUser = await User.findOne({ phone: args.userInput.phone });
//       if (existingUser) {
//         throw new Error('User exists already.');
//       }
//       const user = new User({
//         phone: args.userInput.phone,
//         name: args.userInput.name,
//         avatar: args.userInput.avatar,
//       });

//       const result = await user.save();

//       return { ...result._doc, name: result.name, _id: result.id };
//     } catch (err) {
//       throw err;
//     }
//   },
//   newMessage: async args => {
//     const chat = await Chat.findById(args.newMessageInput.chatId);
//     const message = new Message({
//       from: chat.from ,
//       to: chat.to,
//       date: dateToString(args.newMessageInput.date),
//       body: args.newMessageInput.body
//     });
//     const result = await message.save();
//     chat.messages.push(result);
//     chat.save();
//     return {
//       ...result._doc,
//       _id: result.id,
//       from: user.bind(this, result.from),
//       to: user.bind(this, result.to),
//       date: (result._doc.date),
//       body: result.body
//     };
//   }
//   ,
//   cancelBooking: async args => {
//     try {
//       const booking = await Booking.findById(args.bookingId).populate('event');
//       const event = {
//         ...booking.event._doc,
//         _id: booking.event.id,
//         creator: user.bind(this, booking.event._doc.creator)
//       };
//       await Booking.deleteOne({ _id: args.bookingId });
//       return event;
//     } catch (err) {
//       throw err;
//     }
//   }
// };