import { Request, Response, Router } from 'express';
import passport from 'passport';
import Song from '../../../models/song.model';

const router = Router();

router.post(
  '/create',
  passport.authenticate('bearer', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const { song } = req.body;

      const foundedName = await Song.findOne({ name: song.name });

      if (foundedName?.name === song.name && foundedName?.band === song.band)
        return res.status(400).send({ err: 'songAlreadyExist' });

      new Song({
        song,
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
