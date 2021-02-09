import { Request, Response, Router } from 'express';
import passport from 'passport';
import random from 'lodash.random';
import Playlist from '../../models/playlist.model';

const router = Router();

router.post(
  '/quiz/:id',
  passport.authenticate('bearer', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const { songs } = await Playlist.findOne({ _id: req.params.id });

      const rightSong = songs[random(songs.length)];

      res.status(200).send({
        songs: [
          {
            name: rightSong.name,
            file: rightSong.file,
            answer: true,
          },
          {
            name: songs[random(songs.length)].name,
            answer: false,
          },
          {
            name: songs[random(songs.length)].name,
            answer: false,
          },
          {
            name: songs[random(songs.length)].name,
            answer: false,
          },
        ],
      });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export default router;
