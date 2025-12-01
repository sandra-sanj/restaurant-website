import request from 'supertest';
import app from '../src/app.js'; // your Express app
import {closePool} from '../src/utils/database.js';

let userId;
let token;

const username = 'admin';
const password = 'password';

//beforeAll(async () => {});

afterAll(async () => {
  await closePool();
});

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

describe('Test menu endpoints', () => {
  describe('POST /api/v1/menu', () => {
    it('should add new menu item', async () => {
      const newMenuItem = {
        category_id: 2,
        name: 'Gorilla',
        name_en: 'Corn',
        description: 'Gorillas',
        description_en: 'Crispy corn',
        price: 99.9,
        ingredients: 'corn chips, guacamole, tomato salsa',
        spice_level: 0,
        allows_spice_custom: 0,
        available_proteins: null,
        default_protein: null,
        image_url: '/images/corn_chips.jpg',
        is_available: 1,
      };

      const res = await request(app)
        .post('/api/v1/menu')
        .send(newMenuItem)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('result');
    });
  });

  describe('POST /api/v1/menu', () => {
    it('should fail to add a new menu item', async () => {
      const newMenuItem = {
        category_id: 2,
        name: '',
        name_en: 'Corn',
        description: 'Gorillas',
        description_en: 'Crispy corn',
        price: 99.9,
        ingredients: 'corn chips, guacamole, tomato salsa',
        spice_level: 0,
        allows_spice_custom: 0,
        available_proteins: null,
        default_protein: null,
        image_url: '/images/corn_chips.jpg',
        is_available: 1,
      };

      const res = await request(app)
        .post('/api/v1/menu')
        .send(newMenuItem)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(400);
    });
  });

  // TODO: make tests for each menu item component
});

// TODO: test user access to menu without admin role
