import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import Song from '../../../models/song.model';

const router = Router();

router.post(
  '/create',
  body('name').isString(),
  body('band').isString(),
  body('img').isString(),
  body('file').isString(),
  body('genre').isString(),
  async (req: Request, res: Response) => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty())
        return res
          .status(400)
          .send({ err: 'name band image file and genre are required in body' });
      const { name, band, img, file, genre } = req.body;

      const foundedName = await Song.findOne({ name });

      if (foundedName)
        if (foundedName.name === name && foundedName.band === band)
          return res.status(400).send({ err: 'songAlreadyExist' });

      new Song({
        name,
        band,
        img,
        file,
        genre,
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
