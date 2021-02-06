import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../../models/user';

const router = Router();

router.post(
  '/register',
  body('name').isString(),
  body('pass').isString(),
  body('perms').isString(),
  async (req: Request, res: Response) => {
    try {
      const e = validationResult(req);
      if (!e.isEmpty())
        return res
          .status(400)
          .send({ e: 'both name and pass are required in body' });
      const { name, pass, perms } = req.body;
      const foundedUser = await User.findOne({ name });

      if (foundedUser) return res.status(400).send({ e: 'userExist' });

      const hash = bcrypt.hashSync(pass, 10);

      new User({
        name,
        pass: hash,
        perms,
      })
        .save()
        .then(() => {
          res.status(201).send({
            message: 'Created',
          });
        });
    } catch (e) {
      res.status(500).send({ e });
    }
  }
);

export default router;
