import request from 'supertest';
import app from '../src/app.js'; // your Express app
import {closePool} from '../src/utils/database.js';

afterAll(async () => {
  await closePool();
});

//x postUser, create new user, save token
//x postUser, create second new user, save token
//x postUser, fail to create admin (admin only created manually)

//x login admin user, save admin token
//x login (first user), success
//x login (second user), success

//x getUsers (only admin), success
//x getUsers (regular user), fail

//x getUserById (admin), success
//x getUserById (regular user), fail

//x putUser (admin), success
//x putUser (correct user with token), success
//x putUser (incorrect user with token), fail

//x deleteUser (first user delete second user), fail
//x deleteUser (admin delete second user), success
//x deleteUser (first delete self), success

let firstUserToken;
let secondUserToken;
let adminToken;
let firstUserId;
let secondUserId;
let adminId;

const [username1, password1, email1, phone1, role1] = [
  'Sienna1',
  'password123',
  'sienna1@example.fi',
  '+358998877665',
  'customer',
];

const [username2, password2, email2, phone2, role2] = [
  'Sienna2',
  'password123456',
  'sienna2@example.fi',
  '+358998877665',
  'customer',
];

describe('Test user endpoints', () => {
  //
  // POST tests
  //
  describe('POST /api/v1/users', () => {
    it('should create first new user', async () => {
      const newUser = {
        username: username1,
        email: email1,
        password: password1,
        phone: phone1,
        role: role1,
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
      firstUserId = res.body.result.user_id;
    });

    it('should create second new user', async () => {
      const newUser = {
        username: username2,
        email: email2,
        password: password2,
        phone: phone2,
        role: role2,
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
      secondUserId = res.body.result.user_id;
    });

    it('should fail to create new admin', async () => {
      const newUser = {
        username: 'someotheradmin',
        email: 'someadmin@email.com',
        password: password1,
        phone: phone1,
        role: 'admin',
        is_active: 1,
      };
      const res = await request(app)
        .post('/api/v1/users')
        .send(newUser)
        .set('Accept', 'application/json');

      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(400);
    });
  });

  //
  // AUTH tests
  //
  describe('Test Authentication endpoints', () => {
    describe('POST /api/v1/auth/login', () => {
      it('should fail to login a user and not return a token', async () => {
        const user = {
          username: username1 + '1',
          password: password1,
        };
        const res = await request(app)
          .post('/api/v1/auth/login')
          .send(user)
          .set('Accept', 'application/json');
        // TODO: add all relevant assertions here
        expect(res.statusCode).toEqual(401);
      });

      it('should login user and return a token', async () => {
        const user = {
          username: username1,
          password: password1,
        };
        const res = await request(app)
          .post('/api/v1/auth/login')
          .send(user)
          .set('Accept', 'application/json');
        // TODO: add all relevant assertions here
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.token).toBeDefined();
        firstUserToken = res.body.token;
      });

      it('should login user and return a token', async () => {
        const user = {
          username: username2,
          password: password2,
        };
        const res = await request(app)
          .post('/api/v1/auth/login')
          .send(user)
          .set('Accept', 'application/json');
        // TODO: add all relevant assertions here
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.token).toBeDefined();
        secondUserToken = res.body.token;
      });

      it('should login admin and return a token', async () => {
        const user = {
          username: 'admin',
          password: 'password',
        };
        const res = await request(app)
          .post('/api/v1/auth/login')
          .send(user)
          .set('Accept', 'application/json');
        // TODO: add all relevant assertions here
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        expect(res.body.token).toBeDefined();
        adminToken = res.body.token;
      });
    });

    describe('GET /api/v1/auth/me', () => {
      it('should get user info by valid token', async () => {
        const res = await request(app)
          .get('/api/v1/auth/me')
          .set('Authorization', `Bearer ${firstUserToken}`)
          .set('Accept', 'application/json');

        // save user id if user creation failed (user already exists)
        if (typeof firstUserId === 'undefined') {
          firstUserId = res.body.user.user_id;
        }

        // TODO: add all relevant assertions here
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
      });

      it('should get user info by valid token', async () => {
        const res = await request(app)
          .get('/api/v1/auth/me')
          .set('Authorization', `Bearer ${secondUserToken}`)
          .set('Accept', 'application/json');

        // save user id if user creation failed (user already exists)
        if (typeof secondUserId === 'undefined') {
          secondUserId = res.body.user.user_id;
        }

        // TODO: add all relevant assertions here
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
      });

      it('should get admin info by valid token', async () => {
        const res = await request(app)
          .get('/api/v1/auth/me')
          .set('Authorization', `Bearer ${adminToken}`)
          .set('Accept', 'application/json');

        // save user id if user creation failed (user already exists)
        if (typeof adminId === 'undefined') {
          adminId = res.body.user.user_id;
        }

        // TODO: add all relevant assertions here
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
      });
    });
  });

  //
  // GET tests
  //
  describe('GET /api/v1/users', () => {
    it('should get all users', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('result');
    });

    it('should fail to get all users (not admin)', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${firstUserToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(403);
    });

    it('should fail to get all users (no user logged in)', async () => {
      const res = await request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(401);
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should get user by id (admin token)', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${firstUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('result');
    });

    it('should get user by id (user token on self)', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${firstUserId}`)
        .set('Authorization', `Bearer ${firstUserToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('result');
    });

    it('should fail to get user by id (user token on other user)', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${secondUserId}`)
        .set('Authorization', `Bearer ${firstUserToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(403);
    });

    it('should fail to get user by id (no login token)', async () => {
      const res = await request(app)
        .get(`/api/v1/users/${secondUserId}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(401);
    });
  });

  // PUT tests
  describe('PUT /api/v1/users/:id', () => {
    it('should modify user (admin token)', async () => {
      const updateData = {
        username: 'newSienna1',
        email: 'newsienna1@email.com',
        password: 'newpassword123',
      };

      const res = await request(app)
        .put(`/api/v1/users/${firstUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('result');
    });

    it('should modify user (user token)', async () => {
      const updateData = {
        username: 'newnewSienna1',
        email: 'newnewsienna1@email.com',
        password: 'newnewpassword123',
      };

      const res = await request(app)
        .put(`/api/v1/users/${firstUserId}`)
        .set('Authorization', `Bearer ${firstUserToken}`)
        .send(updateData)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('result');
    });

    it('should fail to modify user (user token on other user)', async () => {
      const updateData = {
        username: 'newSienna2',
        email: 'newsienna2@email.com',
        password: 'newpassword123',
      };

      const res = await request(app)
        .put(`/api/v1/users/${secondUserId}`)
        .set('Authorization', `Bearer ${firstUserToken}`)
        .send(updateData)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(403);
    });

    it('should fail to modify user (no login token)', async () => {
      const updateData = {
        username: 'newSienna2',
        email: 'newsienna2@email.com',
        password: 'newpassword123',
      };

      const res = await request(app)
        .put(`/api/v1/users/${secondUserId}`)
        .send(updateData)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(401);
    });
  });

  //
  // DELETE tests
  //
  describe('DELETE /api/v1/users/:id', () => {
    it('should fail to delete user (wrong token)', async () => {
      const res = await request(app)
        .delete(`/api/v1/users/${secondUserId}`)
        .set('Authorization', `Bearer ${firstUserToken}`)
        .set('Accept', 'application/json');

      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(403);
    });

    it('should fail to delete user (no token)', async () => {
      const res = await request(app)
        .delete(`/api/v1/users/${secondUserId}`)
        .set('Accept', 'application/json');

      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(401);
    });

    it('should delete user (user delete self)', async () => {
      const res = await request(app)
        .delete(`/api/v1/users/${firstUserId}`)
        .set('Authorization', `Bearer ${firstUserToken}`)
        .set('Accept', 'application/json');

      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(200);
    });

    it('should delete user (admin delete user)', async () => {
      const res = await request(app)
        .delete(`/api/v1/users/${secondUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Accept', 'application/json');

      // TODO: add all relevant assertions here
      expect(res.statusCode).toEqual(200);
    });
  });
});
