import Joi from 'joi';

export const createHealthCareSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  complaint: Joi.string().required()
});
