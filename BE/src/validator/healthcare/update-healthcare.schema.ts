import { ComplaintStatus } from '@prisma/client';
import Joi from 'joi';

export const updateHealthCareSchema = Joi.object({
  status: Joi.string().optional().allow(ComplaintStatus.PARTIAL, ComplaintStatus.SOLVED, ComplaintStatus.UNSOLVED).not('', null),
  diagnose: Joi.string().optional().not('', null),
  doctor_msg: Joi.string().optional().not('', null),
  medicine_id: Joi.string().optional().not('', null)
});
