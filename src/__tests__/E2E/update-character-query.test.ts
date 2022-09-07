import * as request from 'supertest';
import * as data from '../../../characters.json';
import { CHARACTERS } from '../queries';
import { Character } from '../../db/types';
import { API_KEY, URL } from '../config';

const characters: Character[] = data;

describe('[MUTATION] update character', () => {
  describe('Updates character', () => {
    test('when all data provided ', async () => {
      const input = {
        id: characters[3].id,
        patch: {
          name: 'GERENAL KENOOOOOBI',
          planet: 'HELLO THERE',
          episodes: ['NEWHOPE'],
        },
      };

      const response = await request(URL)
        .post('/')
        .send({
          query: CHARACTERS.UPDATE_MUTATION,
          variables: { input },
        })
        .set({ 'x-api-key': `${API_KEY}` });

      const { id, ...updatedCharacterData } = response.body.data.updateCharacter;

      expect(response.status).toEqual(200);
      expect(updatedCharacterData).toEqual(input.patch);
      expect(id).toBe(input.id);
    });
    test('when only name is provided', async () => {
      const oldCharacterData = characters[4];

      const { id, name: oldName, ...oldData } = oldCharacterData;

      const input = {
        id,
        patch: {
          name: 'BOBIWAN',
        },
      };

      const response = await request(URL)
        .post('/')
        .send({
          query: CHARACTERS.UPDATE_MUTATION,
          variables: { input },
        })
        .set({ 'x-api-key': `${API_KEY}` });

      const { name, ...notUpdatedData } = response.body.data.updateCharacter;

      expect(response.status).toEqual(200);
      expect(name).toEqual(input.patch.name);
      expect(name).not.toEqual(oldName);
      expect(notUpdatedData).toEqual({ id, ...oldData });
    });
  });

  describe('Returns null', () => {
    test('when called with not existing character ID', async () => {
      const input = {
        id: 'not existing',
        patch: {
          name: 'GERENAL KENOOOOOBI',
        },
      };

      const response = await request(URL)
        .post('/')
        .send({
          query: CHARACTERS.UPDATE_MUTATION,
          variables: { input },
        })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(200);
      expect(response.body.data.updateCharacter).toEqual(null);
    });
  });

  describe('Returns error', () => {
    it('when id is missing', async () => {
      const input = {
        patch: {
          name: 'GERENAL KENOOOOOBI',
          planet: 'HELLO THERE',
          episodes: ['NEWHOPE'],
        },
      };

      const response = await request(URL)
        .post('/')
        .send({
          query: CHARACTERS.UPDATE_MUTATION,
          variables: { input },
        })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(400);
      expect(response.body.errors[0].extensions.code).toEqual('BAD_USER_INPUT');
    });
  });
});
