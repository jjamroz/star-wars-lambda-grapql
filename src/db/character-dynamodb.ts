import { DynamoService } from './abstract-dynamodb';
import { Character } from './types';

const CHARACTERS_TABLE_NAME = process.env.CHARACTERS_TABLE_NAME!;

export class CharacterDynamodb extends DynamoService<Character> {
  private static _instance: CharacterDynamodb;

  private constructor() {
    super(CHARACTERS_TABLE_NAME);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
}
