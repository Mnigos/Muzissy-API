import { Router } from 'express';
import playlistRoutes from './playlist';
import songRoutes from './song';

const router = Router();

router.use('/playlist', playlistRoutes);
router.use('/song', songRoutes);

export default router;
