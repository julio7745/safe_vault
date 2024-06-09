
import { Router } from 'express';
import LoginController from '../../src/controllers/LoginController';

const router = Router();

router.post('/login', LoginController.login);
router.get('/login/verify', LoginController.verify);

router.get('/login/oi', (req, res) => res.status(200).json({ message: 'oi' }));

export default router;
