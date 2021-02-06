import mockingoose from 'mockingoose';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../app';
import User from '../../models/user';

describe('Register system', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("Register fails when user data isn't provided or incomplete", async () => {
    await request(app).post('/auth/register').expect(400);
    await request(app)
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Jhon',
      })
      .expect(400);
  });

  it('Register fails when user already exists', async () => {
    const hash = bcrypt.hashSync('fly', 10);

    mockingoose(User).toReturn(
      {
        name: 'John',
        pass: hash,
        perms: 'admin',
      },
      'findOne'
    );

    await request(app)
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        name: 'John',
        pass: 'fly',
        perms: 'admin',
      })
      .expect(400);
  });

  it('register is succesfull when correct data is provided', async () => {
    await request(app)
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send({
        name: 'John',
        pass: 'fly',
        perms: 'admin',
      })
      .expect(201);
  });
});
