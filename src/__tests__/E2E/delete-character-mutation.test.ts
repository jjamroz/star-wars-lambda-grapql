import * as request from 'supertest';
import * as data from '../../../characters.json';
import { CHARACTERS } from '../queries';
import { Character } from '../../db/types';
import { API_KEY, URL } from '../config';

const characters: Character[] = data;

describe('[MUTATION] delete character', () => {
  describe('Deletes character', () => {
    it('when called with existing character ID', async () => {
      const character = characters[6];

      const response = await request(URL)
        .post('/')
        .send({ query: CHARACTERS.DELETE_MUTATION, variables: { id: character.id } })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(200);
      expect(response.body.data.deleteCharacter).toEqual(character);
    });
  });

  describe('Do not delete and returns null', () => {
    it('when called with not existing character ID', async () => {
      const response = await request(URL)
        .post('/')
        .send({ query: CHARACTERS.DELETE_MUTATION, variables: { id: 'not existing id' } })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(200);
      expect(response.body.data.deleteCharacter).toEqual(null);
    });
  });

  describe('Returns error', () => {
    it('when called with wrong ID type', async () => {
      const response = await request(URL)
        .post('/')
        .send({ query: CHARACTERS.DELETE_MUTATION, variables: { id: 1 } })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(400);
      expect(response.body.errors[0].extensions.code).toEqual('BAD_USER_INPUT');
    });
  });
});
