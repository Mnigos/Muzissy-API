import { Request, Response, Router } from 'express';
import User from '../../models/user.model';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  User.find((err, rawUsers) => {
    if (err) {
      return res.status(500).send({
        err: 'Cannot get this from database',
      });
    }

    const users = rawUsers.map((
      {_id, email, name, perms, __v }) => (
        {_id, email, name, perms, __v}));

    rawUsers.forEach(user => user.pass = "");
    return res.status(200).send({
      users,
    });
  });
});

export default router;
