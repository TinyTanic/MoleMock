const env = process.env || {};

export default {
  PORT: env.PORT,
  DATABASE_URL: env.DATABASE_URL,
  RECAPTCHA_KEY: env.RECAPTCHA_KEY,
  RECAPTCHA_URL: env.RECAPTCHA_URL,
};
