
import { Router } from 'express';
import OpeningController from '../../src/controllers/OpeningController';

const router = Router();

router.get('/opening/getAll', OpeningController.getAll)
router.get('/opening/clear', OpeningController.clear)
router.get('/opening/delete/:_id', OpeningController.deleteOpenig)
router.get('/opening/create', OpeningController.createOpenig);

export default router;
