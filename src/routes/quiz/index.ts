import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const router = Router();

router.post(
  '/quiz/:id',
  body('accessToken').isString(),
  async (req: Request, res: Response) => {
    try {
      const { accessToken } = req.body;

      const err = validationResult(req);
      const validToken = accessToken.toMatch(
        /^([a-zA-Z0-9-_.]+\.){2}[a-zA-Z0-9-_.]+$/i
      );

      if (!err.isEmpty())
        return res.status(400).send({ err: 'token is required' });

      if (!validToken) return res.status(400).send({ err: 'token is invalid' });

      if (!jwt.verify(accessToken, process.env.TOKEN_SECRET))
        return res.status(401).send({ err: 'bad token' });
    } catch (e) {
      res.status(500).send({ e });
    }
  }
);

export default router;
