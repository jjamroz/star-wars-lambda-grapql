import { getCharacter } from './resolvers/get-character.query';
import { getAllCharacters } from './resolvers/get-all-characters.query';
import { createCharacter } from './resolvers/create-character.mutation';
import { updateCharacter } from './resolvers/update-character.mutation';
import { deleteCharacter } from './resolvers/delete-character.mutation';

export const resolvers = {
  Query: {
    getAllCharacters,
    getCharacter,
  },
  Mutation: {
    createCharacter,
    updateCharacter,
    deleteCharacter,
  },
};
