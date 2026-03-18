const request = require('supertest');
const app = require('../src/index');

describe('API health and fallback routes', () => {
  it('returns service status for root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Fashion E-commerce API is running!' });
  });

  it('returns 404 for unknown route', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Route not found' });
  });
}); 