const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString } = graphql;
const ChatType = require('./chatType');
const MessageType = require("./messageType");
const UserType = require("./userType");
const Chat = require("../models/chat");
const User = require("../models/chat");
const Message = require("../models/chat");

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    chats: {
      type: new GraphQLList(ChatType),
      resolve() {
        return Chat.find({});
      }
    },
    chat: {
      type: ChatType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { id }) {
        return Chat.findOne(id);
      }
    },
    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parnetValue, { id }) {
        return User.findOne(id);
      }
    }
  })
});

module.exports = RootQueryType;