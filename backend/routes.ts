
import { Router } from 'express';

const router = Router();

import LoginRouter from './src/router/LoginRouter';
router.use(LoginRouter);

import ProfileRouter from './src/router/ProfileRouter';
router.use(ProfileRouter);

export default router;
