/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/no-default-export */
import { validate } from '../middleware';
import { HealthCareController } from '../controller';
import express from 'express';
import { createHealthCareSchema, updateHealthCareSchema } from '../validator';

const router = express.Router();

router.post('/complaint', validate(createHealthCareSchema), HealthCareController.createComplaint);
router.get('/complaint', HealthCareController.getComplaintList);
router.get('/complaint/:complaint_id', HealthCareController.getComplaintById);
router.patch('/complaint/:complaint_id', validate(updateHealthCareSchema), HealthCareController.updateComplaint);
router.delete('/complaint/:complaint_id', HealthCareController.deleteComplaint);

router.get('/medicine', HealthCareController.getMedicineList);
router.get('/medicine/:medicine_id', HealthCareController.getMedicineById);

export default router;