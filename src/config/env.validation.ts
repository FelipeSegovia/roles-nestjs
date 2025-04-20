import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  MYSQL_ROOT_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  HOST: Joi.string().required(),
});
