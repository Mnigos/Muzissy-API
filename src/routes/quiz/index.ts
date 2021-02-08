import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import authenticate from '../../authenticate';
import Playlist from '../../models/playlist.model';

const router = Router();

router.post(
  '/quiz/:id',
  body('accesToken').isString(),
  authenticate,
  async (req: Request, res: Response) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty())
        return res.status(400).send({ err: 'token is required' });

      const playlist = await Playlist.findOne({ _id: req.params.id });
    } catch (err) {
      res.status(500).send({ err });
    }
  }
);

export default router;
