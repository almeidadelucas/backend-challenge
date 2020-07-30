const request = require('supertest');
const { app, server } = require('../../../index');
const { characters } = require('../../models');

describe('Test GET characters', () => {
  it('GET all characters', done => {
    request(app)
      .get('/characters')
      .expect(res => {
        expect(res.status).toEqual(200);
        expect(res.body.result).toBeInstanceOf(Array);
      })
      .expect(200, done);
  });

  afterAll(() => server.close());
});
