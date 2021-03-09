import { Request, Response, Router } from 'express';
import passport from 'passport';
import Playlist from '../../../models/playlist.model';

const router = Router();

router.post(
  '/edit',
  passport.authenticate('bearer', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const { playlist } = req.body;

      let foundedSong = await Playlist.findOne({ id: playlist.id });

      if (foundedSong) {
        foundedSong = req.body.playlist;
        foundedSong.save();
        res.status(201).send({ message: 'Edited' });
      } else return res.status(400).send({ err: 'songDoesNotExist' });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export default router;
