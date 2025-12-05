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

  /*
    GET tests (order retrieval)
  */

  // Get all orders

  describe('GET /api/v1/orders', () => {
    it('should get all orders (admin token)', async () => {
      const res = await request(app)
        .get('/api/v1/orders')
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fail to get all orders (customer token) FAIL', async () => {
      const res = await request(app)
        .get('/api/v1/orders')
        .set('Authorization', `Bearer ${customerToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(403);
    });

    it('should fail to get all orders (no token) FAIL', async () => {
      const res = await request(app)
        .get('/api/v1/orders')
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(401);
    });
  });

  // GET order by ID

  describe('GET /api/v1/orders/:id', () => {
    it('should get order by ID (admin token)', async () => {
      const res = await request(app)
        .get(`/api/v1/orders/${customerOrderId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('order_id', customerOrderId);
    });

    it('should get own order by ID (customer token)', async () => {
      const res = await request(app)
        .get(`/api/v1/orders/${customerOrderId}`)
        .set('Authorization', `Bearer ${customerToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('order_id', customerOrderId);
    });

    it('should fail to order without token FAIL', async () => {
      const res = await request(app)
        .get(`/api/v1/orders/${customerOrderId}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(401);
    });
  });

  // GET orders for specific user

  describe('GET /api/v1/orders/user/:userId', () => {
    it('should get users own orders (customer token)', async () => {
      const res = await request(app)
        .get(`/api/v1/orders/user/${customerUserId}`)
        .set('Authorization', `Bearer ${customerToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should fail to get another users orders (customer token)', async () => {
      const res = await request(app)
        .get(`/api/v1/orders/user/1`)
        .set('Authorization', `Bearer ${customerToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(403);
    });
  });

  // GET order details with items

  describe('GET /api/v1/orders/:id/details', () => {
    it('should get order details with items (admin token)', async () => {
      const res = await request(app)
        .get(`/api/v1/orders/${customerOrderId}/details`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('items');
      expect(Array.isArray(res.body.items)).toBe(true);
    });

    it('should get own order details with items (customer token)', async () => {
      const res = await request(app)
        .get(`/api/v1/orders/${customerOrderId}/details`)
        .set('Authorization', `Bearer ${customerToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('items');
      expect(Array.isArray(res.body.items)).toBe(true);
    });
  });

  /*
    PUT tests (Update order)
  */

  describe('PUT /api/v1/orders/:id', () => {
    it('should update order (admin token', async () => {
      const updateData = {
        customer_name: 'Updated customer name',
        customer_phone: '+358999999999',
        order_type: 'pickup',
      };

      const res = await request(app)
        .put(`/api/v1/orders/${customerOrderId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('result');
    });

    it('should fail to update order (customer token) FAIL', async () => {
      const updateData = {
        customer_name: 'Should not work',
      };

      const res = await request(app)
        .put(`/api/v1/orders/${customerOrderId}`)
        .set('Authorization', `Bearer ${customerToken}`)
        .send(updateData)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(403);
    });
  });

  /*
    DELETE order tests (Admin only)
  */

  describe('DELETE /api/v1/orders/:id', () => {
    it('should delete order (admin token)', async () => {
      // First create a new order to delete
      const newOrder = {
        customer_name: 'Order to delete',
        customer_email: 'delete@example.com',
        customer_phone: '+358123456789',
        order_type: 'pickup',
        items: [
          {
            menu_item_id: 1,
            item_name: 'Maissilastut',
            quantity: 1,
            unit_price: 7.8,
          },
        ],
      };

      const createRes = await request(app)
        .post('/api/v1/orders')
        .send(newOrder)
        .set('Accept', 'application/json');

      const orderToDeleteId = createRes.body.result.order_id;

      // Now delete the order
      const deleteRes = await request(app)
        .delete(`/api/v1/orders/${orderToDeleteId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .set('Accept', 'application/json');

      expect(deleteRes.statusCode).toEqual(200);
    });

    it('should fail to delete order (customer token) FAIL', async () => {
      const res = await request(app)
        .delete(`/api/v1/orders/${customerOrderId}`)
        .set('Authorization', `Bearer ${customerToken}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(403);
    });
  });
});
