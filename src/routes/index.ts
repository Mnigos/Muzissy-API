import { Router, Request, Response } from 'express';
import authRoutes from './auth';
import adminRoutes from './admin';
import playlistRoutes from './playlists';

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/playlists', playlistRoutes);

export default router;
