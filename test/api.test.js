import request from 'supertest';
import app from '../src/app.js'; // your Express app
import {closePool} from '../src/utils/database.js';

afterAll(async () => {
  await closePool();
});

describe('Test user endpoints', () => {
  let userId;
  let token;

  const username = 'Sienna2';
  const password = 'password123';
  const email = 'sienna2@example.fi';

  describe('POST /api/v1/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        username: username,
        email: email,
        password: password,
        phone: '+358998877665',
        role: 'customer',
        is_active: 1,
      };
      const res = await request(app)
        .post('/api/v1/users')
        .send(newUser)
        .set('Accept', 'application/json');

      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('result');
      expect(res.body.result.user_id).toBeDefined();
      userId = res.body.result.user_id;
    });
  });

  // TODO: test failed user creation
  describe('POST /api/v1/users', () => {
    it('should fail to create a new user', async () => {
      const newUser = {
        username: username,
        email: email,
        password: password,
        phone: '+358998877665',
        role: 'customer',
        is_active: 1,
      };
      const res = await request(app)
        .post('/api/v1/users')
        .send(newUser)
        .set('Accept', 'application/json');

      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(409);
    });
  });

  describe('Test Authentication endpoints', () => {
    describe('POST /api/v1/auth/login', () => {
      it('should login a user and return a token', async () => {
        const user = {
          username: username,
          password: password,
        };
        const res = await request(app)
          .post('/api/v1/auth/login')
          .send(user)
          .set('Accept', 'application/json');
        // TODO: add all relevant assertions here
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.token).toBeDefined();
        token = res.body.token;
      });
    });

    describe('GET /api/v1/auth/me', () => {
      it('should return a list of users', async () => {
        const res = await request(app)
          .get('/api/v1/auth/me')
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json');

        // save user id if user creation failed
        if (typeof userId === 'undefined') {
          userId = res.body.user.user_id;
        }

        // TODO: add all relevant assertions here
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
      });
    });
  });

  // TODO: test user modification (POST)

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete user', async () => {
      const res = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');

      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(200);
    });
  });
});
