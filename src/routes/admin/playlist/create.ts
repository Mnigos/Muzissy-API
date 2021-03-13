import { Request, Response, Router } from 'express';
import passport from 'passport';
import Playlist from '../../../models/playlist.model';

const router = Router();

router.post(
  '/create',
  passport.authenticate('bearer', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const { playlist } = req.body;

      const foundedName = await Playlist.findOne({ name: playlist.name });

      if (foundedName)
        return res.status(400).send({ err: 'playlistAlreadyExist' });

      new Playlist({
        ...playlist,
      })
        .save()
        .then(() => {
          res.status(201).send({
            message: 'Created',
          });
        });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export default router;
