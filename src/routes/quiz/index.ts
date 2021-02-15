import { Router } from 'express';
import questionRoute from './question';

const router = Router();

router.use('/question', questionRoute);

export default router;
