
import { Router } from 'express';
import LoginController from '../../src/controllers/LoginController';

const router = Router();

router.post('/login', LoginController.login);
router.get('/login/verify', LoginController.verify);

export default router;
