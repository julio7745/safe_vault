
import { Router } from 'express';
import ProfileController from '../../src/controllers/ProfileController';

const router = Router();

router.post('/profile/updatePassword', ProfileController.updatePassword);

export default router;
