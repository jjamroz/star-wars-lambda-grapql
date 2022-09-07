import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  type Character {
    id: String!
    name: String!
    episodes: [String!]!
    planet: String
  }

  type AllCharacterPaginated {
    items: [Character!]!
    lastEvaluatedKey: String
  }

  input CharacterInput {
    name: String!
    episodes: [String!]!
    planet: String
  }

  input PatchCharacterData {
    name: String
    episodes: [String!]
    planet: String
  }

  input UpdateCharacterInput {
    id: String!
    patch: PatchCharacterData!
  }

  type Query {
    getAllCharacters(limit: Int, lastEvaluatedKey: String): AllCharacterPaginated!
    getCharacter(id: String!): Character
  }
  type Mutation {
    createCharacter(input: CharacterInput!): Character
    updateCharacter(input: UpdateCharacterInput!): Character
    deleteCharacter(id: String!): Character
  }
`;
