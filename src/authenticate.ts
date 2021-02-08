import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send({ err: 'Unauthorized' });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send({ err: 'Forbidden: token expires' });

    req.user = user;
    next();
  });
}
