import { Router } from 'express';
import playlistRoutes from './playlist';

const router = Router();

router.use('/playlist', playlistRoutes);

export default router;
