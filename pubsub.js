const { PubSub } = require('graphql-subscriptions');

export const pubsub = new PubSub();

// ... Later in your code, when you want to publish data over subscription, run:

const payload = {
    messageAdded: {
        id: '1',
        content: 'Hello!',
    }
};

pubsub.publish('messageAdded', payload);