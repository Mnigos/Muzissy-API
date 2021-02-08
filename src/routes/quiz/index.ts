import { Request, Response, Router } from 'express';
import passport from 'passport';
import Playlist from '../../models/playlist.model';

const router = Router();

router.post(
  '/quiz/:id',
  passport.authenticate('bearer', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const playlist = await Playlist.findOne({ _id: req.params.id });
      const { songs } = playlist;

      const randomNumber = () => Math.floor(Math.random() * songs.length);

      const rightSong = songs[randomNumber()];

      res.status(200).send({
        songs: [
          {
            name: rightSong.name,
            img: rightSong.img,
            file: rightSong.file,
          },
          {
            name: songs[randomNumber()].name,
          },
          {
            name: songs[randomNumber()].name,
          },
          {
            name: songs[randomNumber()].name,
          },
        ],
      });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export default router;
