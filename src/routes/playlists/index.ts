import { Request, Response, Router } from 'express';
import Playlist from '../../models/playlist.model';
const router = Router();

router.post('/', (req: Request, res: Response) => {
  Playlist.findOne((err: any, playlist: any) => {
    if (err) {
      return res.status(500).send({
        err: 'Cannot get this from database'
      });
    }
    res.status(200).send({
      playlist
    });
  });
});

export default router;
