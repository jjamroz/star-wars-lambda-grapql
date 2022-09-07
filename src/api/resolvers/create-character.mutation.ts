import { Character, CreateDto } from '../../db/types';
import { CharacterDynamodb } from '../../db/character-dynamodb';

type createCharacterArgs = {
  input: CreateDto<Character>;
};

export const createCharacter = async (
  _: any,
  { input }: createCharacterArgs,
): Promise<Character | null> => {
  console.log(`[MUTATION] createCharacter called with ${JSON.stringify(input, null, 4)}`);
  return CharacterDynamodb.Instance.createItem(input);
};
