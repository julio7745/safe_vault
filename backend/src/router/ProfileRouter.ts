
import { Router } from 'express';
import ProfileController from '../../src/controllers/ProfileController';

const router = Router();

router.get('/profile/getData', ProfileController.getData);

export default router;
