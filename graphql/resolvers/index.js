const Chat = require('../../models/chat');
const User = require('../../models/user');
const Message = require('../../models/message');

const message = async messageIds => {
  try {
    const messages = await Message.find({ _id: { $in: messageIds } });
    messages.map(message => {
      return {
        ...message._doc,
        _id: message.id,
        from: user.bind(this, message.from),
        to: user.bind(this, message.to),
        date: new Date(message._doc.date).toISOString(),
        body: message.body,
      };
    });
    return messages;
  } catch (err) {
    throw err;
  }
};

const chat = async chatId => {
  try {
    const chat = await Chat.findById(chatId);
    return {
      ...chat._doc,
      _id: chat.id,
      from: chat.from,
      to: chat.to,
      messages: message.bind(this, chat.messages)
    };
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

module.exports = {
    messages: async () => {
    try {
      const messages = await Message.find();
      return messages.map(message => {
        return {
          ...message._doc,
          _id: message.id,
          from: message.from,
          to: message.to,
          date: new Date(message._doc.date).toISOString(),
          body: message.body,
        };
      });
    } catch (err) {
      throw err;
    }
  },
  chats: async () => {
    try {
      const chats = await Chat.find();
      return chats.map(chat => {
        return {
          ...chat._doc,
          _id: chat.id,
          from: chat.from,
          to: chat.to,
          messages: message.bind(this, chat.messages)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createChat: async args => {
    const chat = new Chat({
        from: args.chatInput.from,
        to: args.chatInput.to,
        messages: args.chatInput.messages
    });
    let createdChat;
    try {
      const result = await chat.save();
      createdChat = {
        ...result._doc,
        _id: result._doc._id.toString(),
        from:  user.bind(this, result._doc.from),
        to: user.bind(this, result._doc.to),
        messages: message.bind(this, result._doc.messages)
      };
      return createdChat;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ phone: args.userInput.phone });
      if (existingUser) {
        throw new Error('User exists already.');
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

  newMessage: async args => {
    const chat = await Chat.findOne({ _id: args.chatId });
    const message = new Message({
      from: user.bind(this, chat.from ),
      to: user.bind(this, chat.to),
      date: new Date().toDateString(),
      body: args.body
    });
    const result = await message.save();
    return {
      ...result._doc,
      _id: result.id,
      from: user.bind(this, result.from),
      to: user.bind(this, result.to),
      date: new Date(result._doc.date).toISOString(),
      body: result.body
    };
  }
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
};