import { Character, GetDto } from '../../db/types';
import { CharacterDynamodb } from '../../db/character-dynamodb';

type getCharacterArgs = GetDto<Character>;

export const getCharacter = async (_: any, { id }: getCharacterArgs): Promise<Character | null> => {
  console.log(`[QUERY] getCharacter called with id ${id}`);
  return CharacterDynamodb.Instance.getItem<Character>({ id });
};
