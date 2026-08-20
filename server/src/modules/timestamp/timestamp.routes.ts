import { Router } from 'express';
import * as timestampController from './timestamp.controller';
const router = Router();

router.get('/', timestampController.getCurrentTimestamp)
router.get('/:date', timestampController.getCurrentTimestampByDate)

export default router;
