import { Character, Entity, PaginatedData } from '../../db/types';
import { CharacterDynamodb } from '../../db/character-dynamodb';

type getAllArgs = {
  limit: number;
  lastEvaluatedKey: Entity['id'];
};

export const getAllCharacters = async (
  _: any,
  { limit, lastEvaluatedKey }: getAllArgs,
): Promise<PaginatedData<Character>> => {
  console.log(
    `[QUERY] getAllCharacters called with limit:${limit}, lastEvaluatedKey:${lastEvaluatedKey}`,
  );
  return CharacterDynamodb.Instance.getAllItems<Character>({ limit, lastEvaluatedKey });
};
