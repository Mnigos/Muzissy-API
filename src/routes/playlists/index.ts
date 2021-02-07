import { Request, Response, Router } from 'express';

const router = Router();

router.get('/playlist', (req: Request, res: Response) => {
  res.send('Playlists Here');
});

export default router;
