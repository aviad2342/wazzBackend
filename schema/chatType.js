const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const MessageType = require("./messageType");
const UserType = require("./userType");
const Chat = require("../models/chat");

const ChatType = new GraphQLObjectType({
  name: "ChatType",
  fields: () => ({
    id: { type: GraphQLString },
    from: {
      type: UserType,
      resolve(parentValue) {
        return User.findOne(parentValue.phone);
      },
    },
    to: {
      type: UserType,
      resolve(parentValue) {
        return User.findOne(parentValue.phone);
      },
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parentValue) {
        return Chat.findLyrics(parentValue.id);
      },
    },
  }),
});

module.exports = ChatType;
