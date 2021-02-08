import { Router } from 'express';
import playlistRoute from './create';

const router = Router();

router.use('/', playlistRoute);

export default router;
