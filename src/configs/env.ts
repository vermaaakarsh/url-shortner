export const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  LOG_LEVEL: process.env.LOG_LEVEL ?? "debug",
  URL_DB_URI: process.env.URL_DB_URI ?? "",
  TOKEN_DB_URI: process.env.TOKEN_DB_URI ?? "",
  CUSTOM_ENCODING:
    process.env.CUSTOM_ENCODING ??
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  SHORT_URL_PREFIX: process.env.SHORT_URL_PREFIX ?? "",
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "",
};
