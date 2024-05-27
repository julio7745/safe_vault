
import { Router } from 'express';
import LoginController from '../../src/controllers/LoginController';

const router = Router();

router.post('/login', LoginController.login);
router.get('/oi', (req, res) => { console.log('oi'); res.status(200).json({ message: 'Login bem-sucedido!' }); });

export default router;
