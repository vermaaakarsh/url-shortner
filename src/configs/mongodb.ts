import { ENV } from "./env";

const URL_DB_URI = ENV.URL_DB_URI;
const TOKEN_DB_URI = ENV.TOKEN_DB_URI;

export const mongoConfigs = {
  urldb: {
    uri: URL_DB_URI,
    options: {
      maxPoolSize: 20,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    },
  },

  tokendb: {
    uri: TOKEN_DB_URI,
    options: {
      maxPoolSize: 10,
      minPoolSize: 2,
    },
  },
};
