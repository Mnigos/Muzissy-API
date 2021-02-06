import mockingoose from 'mockingoose';
import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../app';
import User from '../../models/user.model';

describe('Login system', () => {
  beforeEach(() => {
    mockingoose.resetAll();

    delete process.env.TOKEN_SECRET;
    delete process.env.REFRESH_TOKEN_SECRET;
  });

  it("Login fails when user data isn't provided or incomplete", async () => {
    await request(app).post('/auth/login').expect(400);
    await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        name: 'John',
      })
      .expect(400);
  });

  it('Login fails when data is incorrect type', async () => {
    await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        name: 'John',
        pass: 123,
      })
      .expect(400);
  });

  it('login fails when user password is incorrect', async () => {
    mockingoose(User).toReturn(
      {
        name: 'John',
        pass: 'abc',
        perms: 'admin',
      },
      'findOne'
    );

    await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        name: 'John',
        pass: 'zaq1@WSX',
        perms: 'admin',
      })
      .expect(401);
  });

  it('login is succesfull when correct data is provided', async () => {
    process.env.TOKEN_SECRET = 'abc';
    process.env.REFRESH_TOKEN_SECRET = 'abcd';

    const hash = bcrypt.hashSync('fly', 10);

    mockingoose(User).toReturn(
      {
        name: 'John',
        pass: hash,
        perms: 'admin',
      },
      'findOne'
    );

    const res = await request(app)
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        name: 'John',
        pass: 'fly',
      })
      .expect(200);

    expect(res.body?.accessToken).toMatch(
      /^([a-zA-Z0-9-_.]+\.){2}[a-zA-Z0-9-_.]+$/i
    );
  });
});
