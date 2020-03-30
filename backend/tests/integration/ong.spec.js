const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => await connection.destroy());

  it('should be able to create a new ONG', async () => {
    request(app)
      .post('/ongs')
      .send({
        name: "APAD2",
        email: "contato@blabla.com",
        whatsapp: "49998058710",
        city: "Chapecó",
        uf: "SC"
      })
      .then((response) => {
        const body = response.body;
        expect(body).toHaveProperty('id');
        expect(body.id).toHaveLength(8);
      });
  });
});