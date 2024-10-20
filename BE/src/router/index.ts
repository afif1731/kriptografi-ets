import express from 'express';
const router = express.Router();

import AuthRoutes from './auth.router';
import HealthCareRoutes from './healthcare.router';
import BankRoutes from './bank.router';

router.use('/auth', AuthRoutes);
router.use('/healthcare', HealthCareRoutes);
router.use('/bank', BankRoutes);

// eslint-disable-next-line import/no-default-export
export default router;
