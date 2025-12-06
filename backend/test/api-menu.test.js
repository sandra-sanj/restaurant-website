import request from 'supertest';
import app from '../src/app.js'; // your Express app
import {closePool} from '../src/utils/database.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let adminToken;
let userToken;

const admin = {username: 'admin', password: 'password'};
const user = {username: 'liisa', password: 'password'};

afterAll(async () => {
  await closePool();
});

describe('Test user login endpoints', () => {
  describe('POST /api/v1/auth/login', () => {
    it('should login a user and return a token (admin)', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send(admin)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.token).toBeDefined();
      adminToken = res.body.token;
    });

    it('should login a user and return a token (user)', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.token).toBeDefined();
      userToken = res.body.token;
    });
  });
});

describe('Test menu endpoints', () => {
  let itemId;
  const imagePath = path.resolve(
    __dirname,
    '../../frontend/public/images/paaruoat/burrito.jpg'
  );
  const imagePath2 = path.resolve(
    __dirname,
    '../../frontend/public/images/paaruoat/burritobowl.jpg'
  );

  const newMenuItem = {
    category_id: 2,
    name: 'Testiruoka',
    name_en: 'Test Meal',
    description: 'Testiruoka kuvaus',
    description_en: 'Test food description',
    price: 19.9,
    ingredients: 'corn chips, guacamole, tomato salsa',
    spice_level: 0,
    allows_spice_custom: 0,
    available_proteins: '',
    default_protein: '',
    is_available: 1,
  };

  describe('POST /api/v1/menu', () => {
    it('should fail to add a new menu item (not logged in)', async () => {
      // make and send request
      const req = request(app).post('/api/v1/menu').type('form');

      Object.entries(newMenuItem).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          req.field(key, value.toString());
        }
      });
      req.attach('file', imagePath);

      const res = await req;
      expect(res.statusCode).toEqual(401);
    });

    it('should fail to add a new menu item (logged in as not admin)', async () => {
      // make and send request
      const req = request(app)
        .post('/api/v1/menu')
        .set('Authorization', `Bearer ${userToken}`)
        .type('form');

      Object.entries(newMenuItem).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          req.field(key, value.toString());
        }
      });
      req.attach('file', imagePath);

      const res = await req;
      expect(res.statusCode).toBe(403);
    });

    it('should add a new menu item (logged in as admin)', async () => {
      // make and send request
      const req = request(app)
        .post('/api/v1/menu')
        .set('Authorization', `Bearer ${adminToken}`)
        .type('form');

      Object.entries(newMenuItem).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          req.field(key, value.toString());
        }
      });
      req.attach('file', imagePath);

      const res = await req;
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('result');
      expect(res.body.result.menu_item_id).toBeDefined();
      itemId = res.body.result.menu_item_id;
    });
  });

  //
  // GET tests
  //
  describe('GET /api/v1/menu', () => {
    it('should get all menu items', async () => {
      const res = await request(app)
        .get('/api/v1/menu')
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('result');
    });
  });

  describe('GET /api/v1/menu/:id', () => {
    it('should get menu item by id', async () => {
      const res = await request(app)
        .get(`/api/v1/menu/${itemId}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('result');
    });

    it('should fail to get menu item by id (does not exist)', async () => {
      const res = await request(app)
        .get('/api/v1/menu/999999999')
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(404);
    });
  });

  //
  // PUT tests
  //
  describe('PUT /api/v1/menu/:id', () => {
    it('should fail to update menu item (not logged in)', async () => {
      const res = await request(app)
        .put(`/api/v1/menu/${itemId}`)
        .field('name', 'Updated item name');

      expect(res.statusCode).toBe(401);
    });

    it('should fail to update menu item (logged in as not admin)', async () => {
      const res = await request(app)
        .put(`/api/v1/menu/${itemId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .field('name', 'Updated item name');

      expect(res.statusCode).toBe(403);
    });

    it('should update menu item (name) (logged in as admin)', async () => {
      const res = await request(app)
        .put(`/api/v1/menu/${itemId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .field('name', 'Updated item name');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('result');
    });

    it('should update menu item (image) (logged in as admin)', async () => {
      const res = await request(app)
        .put(`/api/v1/menu/${itemId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', imagePath2);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('result');
    });

    it('should fail to update menu item (does not exist)', async () => {
      const res = await request(app)
        .put('/api/v1/menu/999999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .field('name', 'No name');

      expect(res.statusCode).toBe(404);
    });
  });

  //
  // DELETE tests
  //
  describe('DELETE /api/v1/menu/:id', () => {
    it('should fail to delete menu item (not logged in)', async () => {
      const res = await request(app)
        .delete(`/api/v1/menu/${itemId}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(401);
    });

    it('should fail to delete menu item (not admin)', async () => {
      const res = await request(app)
        .delete(`/api/v1/menu/${itemId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(403);
    });

    it('should delete menu item (admin logged in)', async () => {
      const res = await request(app)
        .delete(`/api/v1/menu/${itemId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(200);
    });

    it('should fail to delete menu item (does not exist)', async () => {
      const res = await request(app)
        .delete('/api/v1/menu/999999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toBe(404);
    });
  });
});
