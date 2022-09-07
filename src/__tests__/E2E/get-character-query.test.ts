import * as request from 'supertest';
import * as data from '../../../characters.json';
import { CHARACTERS } from '../queries';
import { Character } from '../../db/types';
import { API_KEY, URL } from '../config';

const characters: Character[] = data;

describe('[QUERY] get character', () => {
  describe('Returns character', () => {
    it('when called with existing character ID', async () => {
      const character = characters[0];

      const response = await request(URL)
        .post('/')
        .send({ query: CHARACTERS.GET_QUERY, variables: { id: character.id } })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(200);
      expect(response.body.data.getCharacter).toEqual(character);
    });
  });

  describe('Returns null', () => {
    it('when called with not existing character ID', async () => {
      const response = await request(URL)
        .post('/')
        .send({ query: CHARACTERS.GET_QUERY, variables: { id: 'not existing id' } })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(200);
      expect(response.body.data.getCharacter).toEqual(null);
    });
  });

  describe('Returns error', () => {
    it('When called with wrong ID type', async () => {
      const response = await request(URL)
        .post('/')
        .send({ query: CHARACTERS.GET_QUERY, variables: { id: 1 } })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(400);
      expect(response.body.errors[0].extensions.code).toEqual('BAD_USER_INPUT');
    });
  });
});
