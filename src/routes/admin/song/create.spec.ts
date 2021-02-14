import mockingoose from 'mockingoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../../../app';
import Song from '../../../models/song.model';

// @TODO: fix this test

xdescribe('Song creation system', () => {
  beforeEach(() => {
    mockingoose.resetAll();

    delete process.env.TOKEN_SECRET;
    delete process.env.REFRESH_TOKEN_SECRET;
  });

  it("creation fails when data isn't provided or incomplete", async () => {
    await request(app).post('/admin/song/create').expect(400);
    await request(app)
      .post('/admin/song/create')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Tutorial Song',
      })
      .expect(400);
  });
  it('creation fails when song with that name and band already exists', async () => {
    mockingoose(Song).toReturn(
      {
        name: 'Tutorial Song',
        band: 'Band',
        img: 'tutorial.png',
        file: 'tutorial.mp3',
        genre: 'example genre',
      },
      'findOne'
    );

    await request(app)
      .post('/admin/song/create')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Tutorial Song',
        band: 'Band',
        img: 'tutorial.png',
        file: 'tutorial.mp3',
        genre: 'example genre',
      })
      .expect(400);
  });
  it('song creation is successful when correct data is provided', async () => {
    process.env.TOKEN_SECRET = 'asd';
    const user = 'john';
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET);

    await request(app)
      .post('/admin/song/create')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Tutorial Song',
        band: 'Band',
        img: 'tutorial.png',
        file: 'tutorial.mp3',
        genre: 'example genre',
      })
      .expect(201);
  });
});
