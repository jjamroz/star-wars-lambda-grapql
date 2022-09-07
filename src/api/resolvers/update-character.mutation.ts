import { CharacterDynamodb } from '../../db/character-dynamodb';
import { Character, UpdateDto } from '../../db/types';

type updateCharacterArgs = {
  input: UpdateDto<Character>;
};

export const updateCharacter = async (_: any, { input }: updateCharacterArgs) => {
  console.log(`[MUTATION] updateCharacter called with ${JSON.stringify(input, null, 4)}`);
  return CharacterDynamodb.Instance.updateItem(input);
};
