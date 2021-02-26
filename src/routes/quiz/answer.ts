import { Request, Response, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import Playlist from '../../models/playlist.model';

const router = Router();

router.post(
  '/:id',
  passport.authenticate('bearer', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const { answer } = req.body;
      const { path } = req.cookies;

      if (!path) return res.status(500).send({ err: 'Cookie path not found' });

      const rightSongId = jwt.verify(path, process.env.SONG_TOKEN_SECRET);
      const rightAnswer = await Playlist.findById(rightSongId);

      if (rightAnswer === answer)
        return res.status(200).send({ answerStatus: true });
      return res.status(200).send({ answerStatus: false });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export default router;
