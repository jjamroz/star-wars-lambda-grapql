import { AuthenticationError, ApolloServer } from 'apollo-server-lambda';
require('dotenv').config();
import { typeDefs } from './api/schema';
import { resolvers } from './api/resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  csrfPrevention: true,
  cache: 'bounded',
  context: ({ event }) => {
    if (event.headers['x-api-key'] !== process.env.X_API_KEY) {
      throw new AuthenticationError('You must provide correct x-api-key');
    }
  },
});

exports.graphqlHandler = server.createHandler();
