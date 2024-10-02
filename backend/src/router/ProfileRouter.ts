
import { Router } from 'express';
import ProfileController from '../../src/controllers/ProfileController';

const router = Router();

router.post('/profile/updatePassword', ProfileController.updatePassword);
router.post('/profile/delete', ProfileController.deleteProfile);

export default router;
