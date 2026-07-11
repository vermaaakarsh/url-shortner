import pino from "pino";
import { ENV } from "../../configs/env";

const isProduction = ENV.NODE_ENV === "production";

const logger = isProduction
  ? pino({
      level: ENV.LOG_LEVEL || "info",
      serializers: {
        err: pino.stdSerializers.err,
      },
    })
  : pino(
      {
        level: ENV.LOG_LEVEL || "debug",
        serializers: {
          err: pino.stdSerializers.err,
        },
      },
      pino.transport({
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
          singleLine: false,
        },
      }),
    );

export default logger;
