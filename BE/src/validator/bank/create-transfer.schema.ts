import Joi from 'joi';

export const createTransferSchema = Joi.object({
  order_id: Joi.string().required(),
  gross_amount: Joi.string().required(),
  card_number: Joi.string().required(),
  card_month_expire: Joi.string().required(),
  card_year_expire: Joi.string().required(),
  card_cvc: Joi.string().required(),
  signature_key: Joi.string().required(),
  transfer_msg: Joi.string().required(),
});
