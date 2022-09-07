import * as request from 'supertest';
import { CHARACTERS } from '../queries';
import { API_KEY, URL } from '../config';

describe('[QUERY] get all characters', () => {
  describe('Return paginated response', () => {
    it('when called without params', async () => {
      const response = await request(URL)
        .post('/')
        .send({ query: CHARACTERS.GET_ALL_QUERY, variables: {} })
        .set({ 'x-api-key': `${API_KEY}` });

      const data = response.body.data.getAllCharacters;

      expect(response.status).toEqual(200);
      expect(data.items).toHaveLength(5);
      data.items.forEach((item) => {
        expect(item.id).toBeTruthy();
        expect(item.name).toBeTruthy();
      });
      expect(data.lastEvaluatedKey).toBeTruthy();
    });

    it('when called with limit', async () => {
      const response = await request(URL)
        .post('/')
        .send({ query: CHARACTERS.GET_ALL_QUERY, variables: { limit: 3 } })
        .set({ 'x-api-key': `${API_KEY}` });

      const data = response.body.data.getAllCharacters;

      expect(response.status).toEqual(200);
      expect(data.items).toHaveLength(3);
      data.items.forEach((item) => {
        expect(item.id).toBeTruthy();
        expect(item.name).toBeTruthy();
      });
      expect(data.lastEvaluatedKey).toBeTruthy();
    });

    it('when called with limit exceeding max limit', async () => {
      const response = await request(URL)
        .post('/')
        .send({ query: CHARACTERS.GET_ALL_QUERY, variables: { limit: 20 } })
        .set({ 'x-api-key': `${API_KEY}` });

      const data = response.body.data.getAllCharacters;

      expect(response.status).toEqual(200);
      expect(data.items).toHaveLength(5);
      data.items.forEach((item) => {
        expect(item.id).toBeTruthy();
        expect(item.name).toBeTruthy();
      });
      expect(data.lastEvaluatedKey).toBeTruthy();
    });

    it('when called with limit and lastEvaluatedKey that ends pagination', async () => {
      const response = await request(URL)
        .post('/')
        .send({
          query: CHARACTERS.GET_ALL_QUERY,
          variables: { limit: 5, lastEvaluatedKey: '67fb1ec0-57df-4461-9d5c-e077426f99fa' },
        })
        .set({ 'x-api-key': `${API_KEY}` });

      const data = response.body.data.getAllCharacters;

      expect(response.status).toEqual(200);
      expect(data.items.length).toBeLessThan(5);
      data.items.forEach((item) => {
        expect(item.id).toBeTruthy();
        expect(item.name).toBeTruthy();
      });
      expect(data.lastEvaluatedKey).toBe(null);
    });

    it('when called with only lastEvaluatedKey', async () => {
      const response = await request(URL)
        .post('/')
        .send({
          query: CHARACTERS.GET_ALL_QUERY,
          variables: { lastEvaluatedKey: '67fb1ec0-57df-4461-9d5c-e077426f99fa' },
        })
        .set({ 'x-api-key': `${API_KEY}` });

      const data = response.body.data.getAllCharacters;

      expect(response.status).toEqual(200);
      expect(data.items.length).toBeLessThan(5);
      data.items.forEach((item) => {
        expect(item.id).toBeTruthy();
        expect(item.name).toBeTruthy();
      });
      expect(data.lastEvaluatedKey).toBe(null);
    });
  });

  describe('Returns error', () => {
    it('when called with wrong lastEvaluatedKey type', async () => {
      const response = await request(URL)
        .post('/')
        .send({ query: CHARACTERS.GET_ALL_QUERY, variables: { lastEvaluatedKey: 1 } })
        .set({ 'x-api-key': `${API_KEY}` });

      expect(response.status).toEqual(400);
      expect(response.body.errors[0].extensions.code).toEqual('BAD_USER_INPUT');
    });
  });
});
