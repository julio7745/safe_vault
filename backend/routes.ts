import { Router } from 'express';
import loginRoutes from './src/router/LoginRouter';

const router = Router();

router.use(loginRoutes);

export default router;
