import { Router } from 'express';
import authRoutes from './auth';
import adminRoutes from './admin';
import quizRoutes from './quiz';

const router = Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/quiz', quizRoutes);

export default router;
