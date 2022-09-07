import { CharacterDynamodb } from '../../db/character-dynamodb';
import { Character, DeleteDto } from '../../db/types';

type deleteCharacterArgs = DeleteDto<Character>;

export const deleteCharacter = async (
  _: any,
  { id }: deleteCharacterArgs,
): Promise<Character | null> => {
  console.log(`[MUTATION] deleteCharacter called with id ${id}`);
  return CharacterDynamodb.Instance.deleteItem<Character>({ id });
};
