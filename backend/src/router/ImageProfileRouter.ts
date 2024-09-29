
import { Router } from 'express';
import ImageProfileController from '../../src/controllers/ImageProfileController';

const router = Router();

router.post('/imageProfile/updateImage', ImageProfileController.updateImage);

export default router;
