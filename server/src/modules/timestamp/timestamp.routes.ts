import { Router } from 'express';
import * as timestampController from './timestamp.controller';
const router = Router();
interface TimestampResponse {
    unix: number;
    utc: string;
}

router.get('/', timestampController.getCurrentTimestamp)
router.get('/:date', timestampController.getCurrentTimestampByDate)

export default router;
