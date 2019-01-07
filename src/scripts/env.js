const env = process.env || {};

export default {
  PORT: env.PORT,
  DATABASE_URL: env.DATABASE_URL,
}