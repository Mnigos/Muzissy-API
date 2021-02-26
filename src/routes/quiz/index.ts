import { Router } from 'express';
import questionRoute from './question';
import answerRoute from './answer';

const router = Router();

router.use('/question', questionRoute);
router.use('/answer', answerRoute);

export default router;
