import * as request from 'supertest';
import { CHARACTERS } from '../queries';
import { API_KEY, URL } from '../config';

describe('[MUTATION] create character', () => {
  describe('Creates character', () => {
    test('when all data provided ', async () => {
      const input = {
        name: 'GERENAL KENOOOOOBI',
        planet: 'HELLO THERE',
        episodes: ['NEWHOPE'],
      };

      const response = await request(URL)
        .post('/')
        .send({
          query: CHARACTERS.CREATE_MUTATION,
          variables: { input },
        })
        .set({ 'x-api-key': `${API_KEY}` });

      const { id, ...createdCharacterData } = response.body.data.createCharacter;

      expect(response.status).toEqual(200);
      expect(createdCharacterData).toEqual(input);
      expect(id).toBeTruthy();

      ///CLEANUP
      await request(URL)
        .post('/')
        .send({ query: CHARACTERS.DELETE_MUTATION, variables: { id } })
        .set({ 'x-api-key': `${API_KEY}` });
    });

    it('when planet is not provided', async () => {
      const input = {
        name: 'GERENAL KENOOOOOBI',
        episodes: ['NEWHOPE'],
      };

      const response = await request(URL)
        .post('/')
        .send({
          query: CHARACTERS.CREATE_MUTATION,
          variables: { input },
        })
        .set({ 'x-api-key': `${API_KEY}` });

      const { id, planet, ...createdCharacterData } = response.body.data.createCharacter;

      expect(response.status).toEqual(200);
      expect(createdCharacterData).toEqual(input);
      expect(planet).toEqual(null);
      expect(id).toBeTruthy();

      //cleanup
      await request(URL)
        .post('/')
        .send({ query: CHARACTERS.DELETE_MUTATION, variables: { id } })
        .set({ 'x-api-key': `${API_KEY}` });
    });
  });

  describe('Returns error', () => {
    it('when name is missing', async () => {
      const input = {
        episodes: ['NEWHOPE'],
      };

      const response = await request(URL)
        .post('/')
        .send({
          query: CHARACTERS.CREATE_MUTATION,
          variables: { input },
        })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(400);
      expect(response.body.errors[0].extensions.code).toEqual('BAD_USER_INPUT');
    });

    it('when x-api-key is missing', async () => {
      const input = {
        name: 'GERENAL KENOOOOOBI',
        episodes: ['NEWHOPE'],
      };

      const response = await request(URL).post('/').send({
        query: CHARACTERS.CREATE_MUTATION,
        variables: { input },
      });

      expect(response.status).toEqual(400);
      expect(response.body.errors[0].extensions.code).toEqual('UNAUTHENTICATED');
    });

    //TODO add validation for empty episodes
    xit('when no episodes is provided', async () => {
      const input = {
        name: 'GERENAL KENOOOOOBI',
        episodes: [],
      };

      const response = await request(URL)
        .post('/')
        .send({
          query: CHARACTERS.CREATE_MUTATION,
          variables: { input },
        })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(400);
      expect(response.body.errors[0].extensions.code).toEqual('BAD_USER_INPUT');
    });
  });
});
