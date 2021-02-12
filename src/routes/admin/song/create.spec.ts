import mockingoose from 'mockingoose';
import request from 'supertest';
import app from '../../../app';
import Song from '../../../models/song.model';

describe('Song creation system', () => {
  beforeEach(() => {
    mockingoose.resetAll();
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
      .expect(201);
  });
});
