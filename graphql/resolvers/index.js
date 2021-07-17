const chatResolver = require('./chat');
const userResolver = require('./user');
const messageResolver = require('./message');

const rootResolver = {
    ...chatResolver,
    ...userResolver,
    ...messageResolver
};
module.exports = rootResolver;
