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
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export default router;
