import { Router } from 'express';
import * as messageController from './contact.controller';
import { asyncHandler } from '../../middleware/async-handle';

const router = Router();

router.post(
  '/',
  asyncHandler(messageController.createMessage),
);

router.get(
  '/all',
  asyncHandler(messageController.getAllMessages),
);

export default router;