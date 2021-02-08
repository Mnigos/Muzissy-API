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
            img: rightSong.img,
            file: rightSong.file,
          },
          {
            name: songs[random(songs.length)].name,
          },
          {
            name: songs[random(songs.length)].name,
          },
          {
            name: songs[random(songs.length)].name,
          },
        ],
      });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export default router;
