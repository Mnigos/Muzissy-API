import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import Playlist from '../../../models/playlist.model';

const router = Router();

router.post(
  '/create',
  body('name').isString(),
  body('img').isString(),
  body('difficulty').isString(),
  passport.authenticate('bearer', { session: false }),
  async (req: Request, res: Response) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty())
        return res
          .status(400)
          .send({ err: 'name image and difficulty are required in body' });
      const { name, img, difficulty } = req.body;

      const foundedName = await Playlist.findOne({ name });

      if (foundedName)
        return res.status(400).send({ err: 'playlistAlreadyExist' });

      new Playlist({
        name,
        img,
        difficulty,
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
