import { typeDefs } from '../../api/schema';
import { resolvers } from '../../api/resolvers';
import { ApolloServer } from 'apollo-server-lambda';
import * as data from '../../../characters.json';
import { CHARACTERS } from '../queries';
import { Character } from '../../db/types';

jest.mock('aws-sdk', () => {
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => ({
        get: mockDynamoMethod({
          Item: data[0] as Character,
        }),
        put: mockDynamoMethod({
          Item: data[0] as Character,
        }),
        delete: mockDynamoMethod({
          Attributes: data[0] as Character,
        }),
        scan: mockDynamoMethod({
          Items: data as [Character],
          LastEvaluatedKey: {
            id: data[0].id,
          },
        }),
      })),
    },
  };
});

describe('API TESTS', () => {
  test('GET character', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const res = await server.executeOperation({
      query: CHARACTERS.GET_QUERY,
      variables: { id: 'SOME_VALID_ID' },
    });
    expect(res).toMatchSnapshot();
  });

  test('GET ALL characters', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const res = await server.executeOperation({
      query: CHARACTERS.GET_ALL_QUERY,
    });
    expect(res).toMatchSnapshot();
  });

  test('UPDATE character', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const res = await server.executeOperation({
      query: CHARACTERS.UPDATE_MUTATION,
      variables: {
        input: {
          id: data[3].id,
          patch: {
            name: 'GERENAL KENOOOOOBI',
            planet: 'HELLO THERE',
            episodes: ['NEWHOPE'],
          },
        },
      },
    });
    expect(res).toMatchSnapshot();
  });

  test('CREATE character', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const res = await server.executeOperation({
      query: CHARACTERS.CREATE_MUTATION_NO_ID,
      variables: {
        input: {
          name: 'GERENAL KENOOOOOBI',
          planet: 'HELLO THERE',
          episodes: ['NEWHOPE'],
        },
      },
    });
    expect(res).toMatchSnapshot();
  });

  test('DELETE character', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const res = await server.executeOperation({
      query: CHARACTERS.DELETE_MUTATION,
      variables: { id: 'SOME_VALID_ID' },
    });
    expect(res).toMatchSnapshot();
  });
});

const mockDynamoMethod = (returnValue) =>
  jest.fn().mockImplementation(() => {
    return {
      promise: jest.fn().mockResolvedValue(returnValue),
    };
  });
