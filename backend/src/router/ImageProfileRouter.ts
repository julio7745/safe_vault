
import { Router } from 'express';
import ImageProfileController from '../../src/controllers/ImageProfileController';

const router = Router();

router.post('/imageProfile/updateImage', ImageProfileController.updateImage);
router.post('/imageProfile/load', ImageProfileController.loadImage);

export default router;
