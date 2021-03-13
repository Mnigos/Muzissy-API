import { Request, Response, Router } from 'express';
import passport from 'passport';
import Song from '../../../models/song.model';

const router = Router();

router.post(
  '/edit',
  passport.authenticate('bearer', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const { song } = req.body;

      let foundedSong = await Song.findOne({ id: song.id });

      if (foundedSong) {
        foundedSong = song;
        foundedSong.save();
        res.status(201).send({ message: 'Edited' });
      } else return res.status(400).send({ err: 'songDoesNotExist' });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export default router;
