import mockingoose from 'mockingoose';
import request from 'supertest';
import app from '../../../app';
import Playlist from '../../../models/playlist.model';

// @TODO: fix this test

xdescribe('Playlist creation system', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it("creation fails when data isn't provided or incomplete", async () => {
    await request(app).post('/admin/playlist/create').expect(400);
    await request(app)
      .post('/admin/playlist/create')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Tutorial Playlist',
      })
      .expect(400);
  });

  it('creation fails when playlist with that name already exists', async () => {
    mockingoose(Playlist).toReturn(
      {
        name: 'Tutorial Playlist',
        img: 'playlist.png',
        difficulty: 'easy',
      },
      'findOne'
    );

    await request(app)
      .post('/admin/playlist/create')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Tutorial Playlist',
        img: 'TutPlaylist.png',
        difficulty: 'hard',
      })
      .expect(400);
  });

  it('playlist creation is successful when correct data is provided', async () => {
    await request(app)
      .post('/admin/playlist/create')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Tutorial Playlist',
        img: 'playlist.png',
        difficulty: 'easy',
      })
      .expect(201);
  });
});
