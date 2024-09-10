import { registerAs } from '@nestjs/config';

export default registerAs('common', () => ({
  environment: process.env.ENVIRONMENT || 'production',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  i18n: {
    fallbackLanguage: process.env.I18N_FALLBACK_LANGUAGE,
  },
  auth: {
    jwt_secrete: process.env.JWT_SECRET,
    refreshTokenPrefix: process.env.REFRESH_TOKEN_PREFIX,
    refreshTokenLength: process.env.REFRESH_TOKEN_LENGTH,
    accessTokenExpiration: process.env.ACCESS_TOKEN_EXPIRES_IN_MS,
    refreshTokenExpirationTime: process.env.REFRESH_TOKEN_EXPIRES_IN_MS,
    cookie: {
      expiry: process.env.COOKIE_EXPIRES_IN_MS,
      name: process.env.COOKIE_NAME,
      secret: process.env.COOKIE_SECRET,
    },
  },
}));
