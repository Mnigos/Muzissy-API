import { Router } from 'express';
import createRoute from './create';
import editRoute from './edit';

const router = Router();

router.use('/', createRoute);
router.use('/', editRoute);

export default router;
