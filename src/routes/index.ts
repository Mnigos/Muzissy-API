import { Router } from 'express';
import authRoutes from './auth';
import adminRoutes from './admin';
import playlistRoutes from './playlists';
import quizRoutes from './quiz';
import userRoutes from './users';

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/playlists', playlistRoutes);
router.use('/quiz', quizRoutes);
router.use('/users', userRoutes);

export default router;
