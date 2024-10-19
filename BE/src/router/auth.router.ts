/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import express from 'express';

import { AuthController } from '../controller';
import { validate } from '../middleware';
import { loginSchema } from '../validator';

const router = express.Router();

router.post('/login', validate(loginSchema), AuthController.login);
//router.post('/register', validate(registerSchema), AuthController.register);

export default router;
