/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import express from 'express';

import { validate } from '../middleware';
import { createTransferSchema } from '../validator';
import { BankController } from '../controller';

const router = express.Router();

router.post('/transfer', validate(createTransferSchema), BankController.createTransfer);
router.get('/transfer', BankController.getTransferList);
router.get('/transfer/:transfer_id', BankController.getTransferById);
router.delete('/transfer/:transfer_id', BankController.deleteTransfer);

export default router;