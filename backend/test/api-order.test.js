import request from 'supertest';
import app from '../src/app.js';

import {closePool} from '../src/utils/database.js';

afterAll(async () => {
  await closePool();
});

let adminToken;

const adminUser = {
  username: 'admin',
  password: 'password',
};

describe('Test order endpoints', () => {
  // Authentication setup

  describe('Authentication setup', () => {
    it('should login admin and return token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send(adminUser)
        .set('Accepet', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.token).toBeDefined();
      adminToken = res.body.token;
    });
  });
});
