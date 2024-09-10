import * as Joi from 'joi';

export default {
  envFilePath: [
    '.local.env',
    '.development.env',
    '.staging.env',
    '.beta.env',
    '.production.env',
    '.env',
  ],
  cache: true,
  isGlobal: true,
  validationSchema: Joi.object({
    // common
    NODE_ENV: Joi.string().valid(
      'local',
      'development',
      'staging',
      'beta',
      'production',
    ),
    APP_PORT: Joi.number().integer().required(),

    // SWAGGER_API_ROOT: Joi.string().required(),

    // - I18N
    I18N_FALLBACK_LANGUAGE: Joi.string().required(),

    // // - Auth
    // JWT_SECRET: Joi.string().required(),
    // JWT_EXPIRES_IN_MS: Joi.string().required(),
    // REFRESH_TOKEN_EXPIRES_IN_MS: Joi.string().required(),

    // prisma
    POSTGRES_DATABASE_URL: Joi.string().required(),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
};
