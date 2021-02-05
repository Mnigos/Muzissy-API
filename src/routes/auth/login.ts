import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import { requireObjectKeysType } from '../../validation';

const router = Router();

router.post(
  '/login',
  body('name').isString(),
  body('pass').isString(),
  async (req: Request, res: Response) => {
    try {
      if (!requireObjectKeysType(req.body, ['name', 'pass'], 'string'))
        return res
          .status(400)
          .send({ e: 'both name and pass are required in body' });

      const { name, pass } = req.body;
      const foundedUser = await User.findOne({ name });

      if (!foundedUser) return res.status(400).send({ e: 'userNotFound' });

      const isPasswordCorrect = bcrypt.compareSync(pass, foundedUser.pass);

      if (!isPasswordCorrect)
        return res.status(401).send({ e: 'password Incorrect' });

      const token = jwt.sign(
        { user: foundedUser.name, perms: foundedUser.perms },
        'privateKey'
      );

      res.send({ token, perms: foundedUser.perms });
    } catch (e) {
      res.status(500).send({ e });
    }
  }
);

export default router;
