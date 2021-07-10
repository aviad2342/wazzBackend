const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQL ,
  GraphQLString
} = graphql;
const UserType = require('./userType');
const User = require("../models/user");

const dateValue = (value) => {
    if (value instanceof Date) {
      return +value;
    }
  }
  const DateType = new graphql.GraphQLScalarType({
    name: 'Date',
    serialize: dateValue,
    parseValue: dateValue,
    parseLiteral(ast) {
      return dateValue(ast.value);
    }
  });


const MessageType = new GraphQLObjectType({
  name:  'MessageType',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: DateType },
    body: { type: GraphQLString },
    from: {
      type: UserType,
      resolve(parentValue) {
        return User.findOne(parentValue.phone);
      }
    },
    to: {
        type: UserType,
        resolve(parentValue) {
          return User.findOne(parentValue.phone);
        }
      }
  })
});

module.exports = MessageType;