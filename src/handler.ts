import { AuthenticationError } from 'apollo-server-lambda';

require('dotenv').config();
import { typeDefs } from './api/schema';
import { resolvers } from './api/resolvers';

const { ApolloServer } = require('apollo-server-lambda');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  csrfPrevention: true,
  cache: 'bounded',
  context: ({ event }) => {
    if (event.headers['x-api-key'] !== process.env.X_API_KEY) {
      throw new AuthenticationError('You must provide correct x-api-key');
    }
  },
});

exports.graphqlHandler = server.createHandler();
