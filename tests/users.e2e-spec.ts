import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
  const { app } = await boot;
  application = app;
});

describe('Users e2e', () => {
  it('Register - error', async () => {
    const res = await request(application.app)
      .post('/users/register')
      .send({ email: 'a@a.ua', password: '1' });
    expect(res.statusCode).toBe(422);
  });

  it('Login - success', async () => {
    const res = await request(application.app).post('/users/login').send({
      email: 'email@gmail.com',
      password: '1234',
      name: 'email',
    });
    expect(res.statusCode).toBe(200);
  });

  it('Incorrect login - error', async () => {
    const res = await request(application.app).post('/users/login').send({
      email: 'email@gmail.com',
      password: '12345',
      name: 'email',
    });
    expect(res.statusCode).not.toBe(200);
  });

  it('Get info with JWT', async () => {
    const login = await request(application.app).post('/users/login').send({
      email: 'email@gmail.com',
      password: '1234',
      name: 'email',
    });
    const jwt = login.body;
    console.log(login.statusCode);
    const res = await request(application.app)
      .get('/users/info')
      .set('Authorization', `Bearer ${jwt}`);

    expect(res.body.email).toBe('email@gmail.com');
  });
});

afterAll(() => {
  application.close();
});
