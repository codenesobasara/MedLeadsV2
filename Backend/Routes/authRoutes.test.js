const request = require('supertest');
const express = require('express');
const authRoutes = require('./authRoutes');
const auth = require('../AuthService/AutheService');


jest.mock('../AuthService/AutheService');
jest.mock('../UserService/UserFunctions');

describe('Auth Routes', () => {
  let app;

  beforeEach(() => {
    // Create a fresh app instance for each test
    app = express();
    app.use(express.json());
    app.use('/auth', authRoutes);
    
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  // ===== LOGIN ENDPOINT TESTS =====
  describe('POST /auth/login', () => {
    it('should successfully login with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        role: 'host'
      };

      // Mock the auth service functions
      auth.authCheck.mockResolvedValue(mockUser);
      auth.authorize.mockResolvedValue({
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token'
      });

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('tokens');
      expect(response.body.tokens).toHaveProperty('accessToken');
      expect(response.body.tokens).toHaveProperty('refreshToken');
    });

    it('should return 404 if user not found', async () => {
      auth.authCheck.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'user not found');
    });

    it('should return 500 if token creation fails', async () => {
      const mockUser = { id: 1, email: 'test@example.com' };
      auth.authCheck.mockResolvedValue(mockUser);
      auth.authorize.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Failed to Create Tokens');
    });
  });

  // ===== REGISTER ENDPOINT TESTS =====
  describe('POST /auth/register', () => {
    it('should create a new user with 3 fields (email, password, role)', async () => {
      const newUser = { id: 1, email: 'newuser@example.com', role: 'vendor' };
      
      auth.createUser.mockResolvedValue(newUser);
      auth.authorize.mockResolvedValue({
        accessToken: 'token123',
        refreshToken: 'refresh123'
      });

      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          role: 'vendor'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'user Created');
      expect(response.body).toHaveProperty('Tokens');
    });

    it('should return 400 if user creation fails', async () => {
      auth.createUser.mockResolvedValue(null);

      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'password123',
          role: 'vendor'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid user data');
    });
  });
});
