import { Router } from 'express';
import loginRoute from './login';

const router = Router();

router.use('/', loginRoute);

export default router;
