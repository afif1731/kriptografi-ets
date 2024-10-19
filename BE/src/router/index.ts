import express from 'express';
const router = express.Router();

import AuthRoutes from './auth.router';

router.use('/auth', AuthRoutes);

// eslint-disable-next-line import/no-default-export
export default router;
