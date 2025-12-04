import request from 'supertest';
import app from '../src/app.js';

import {closePool} from '../src/utils/database.js';

afterAll(async () => {
  await closePool();
});

let adminToken;
let customerToken;
let customerUserId;
let customerOrderId;

const adminUser = {
  username: 'admin',
  password: 'password',
};

const customerUser = {
  username: 'liisa',
  password: 'password',
};

describe('Test order endpoints', () => {
  /*
   Authentication setup
   */

  describe('Authentication setup', () => {
    it('should login admin and return token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send(adminUser)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.token).toBeDefined();
      adminToken = res.body.token;
    });

    it('should login customer and return token', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send(customerUser)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('user');
      expect(res.body.token).toBeDefined();
      customerToken = res.body.token;
      customerUserId = res.body.user.user_id;
    });
  });

  /*
  POST tests (order creation)
  */

  describe('POST /api/v1/orders', () => {
    it('should create new guest order (no token)', async () => {
      const newOrder = {
        customer_name: 'Guest customer',
        customer_email: 'guest@example.com',
        customer_phone: '+358123456789',
        order_type: 'pickup',
        items: [
          {
            menu_item_id: 1,
            item_name: 'Maissilastut',
            quantity: 2,
            unit_price: 7.9,
          },
        ],
      };

      const res = await request(app)
        .post('/api/v1/orders')
        .send(newOrder)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('result');
      expect(res.body.result).toHaveProperty('order_id');
      expect(res.body.result.user_id).toBeNull();
    });

    it('should create new order for logged in customer', async () => {
      const newOrder = {
        customer_name: 'Liisa Virtanen',
        customer_email: 'liisa@example.com',
        customer_phone: '+358112233445',
        order_type: 'delivery',
        delivery_address: 'Myllypurontie 1, Helsinki',
        items: [
          {
            menu_item_id: 3,
            item_name: 'Kanatacot x 3',
            quantity: 1,
            unit_price: 14.5,
            selected_spice_level: 2,
          },
          {
            menu_item_id: 11,
            item_name: 'Jarritos Lime',
            quantity: 2,
            unit_price: 3.9,
          },
        ],
      };

      const res = await request(app)
        .post('/api/v1/orders')
        .send(newOrder)
        .set('Authorization', `Bearer ${customerToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('result');
      expect(res.body.result).toHaveProperty('order_id');
      expect(res.body.result.user_id).toEqual(customerUserId);
      customerOrderId = res.body.result.order_id;
    });

    it('should fail to create order with missing required fields', async () => {
      const invalidOrder = {
        customer_name: 'Test',
        // Missing email, phone, items etc.
      };

      const res = await request(app)
        .post('/api/v1/orders')
        .send(invalidOrder)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(400);
    });

    it('should fail to create order with empty items array', async () => {
      const invalidOrder = {
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_phone: '+358123456788',
        order_type: 'pickup',
        items: [], // Empty items array
      };

      const res = await request(app)
        .post('/api/v1/orders')
        .send(invalidOrder)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(400);
    });

    it('should fail to create order with invalid Finnish phone number', async () => {
      const invalidOrder = {
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_phone: '+123467890', // Invalid Finnish number
        order_type: 'pickup',
        items: [
          {
            menu_item_id: 1,
            item_name: 'test item',
            quantity: 1,
            unit_price: 7.9,
          },
        ],
      };

      const res = await request(app)
        .post('/api/v1/orders')
        .send(invalidOrder)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(400);
    });
  });
});
