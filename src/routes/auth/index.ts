import { Router } from 'express';
import loginRoute from './login';
import registerRoute from './register';

const router = Router();

router.use('/', loginRoute);
router.use('/', registerRoute);

export default router;
