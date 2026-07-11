import type { Logger } from "pino";
import logger from "./index";

export function logApplicationError(
  err: unknown,
  metadata: Record<string, unknown> = {},
  customLogger?: Logger,
) {
  const error = err instanceof Error ? err : new Error(String(err));
  const targetLogger = customLogger || logger;
  targetLogger.error({ ...metadata, err: error }, error.message);
}

export function logApplicationWarn(
  message: string,
  metadata: Record<string, unknown> = {},
  customLogger?: Logger,
) {
  const targetLogger = customLogger || logger;
  targetLogger.warn({ ...metadata }, message);
}

export function logApplicationInfo(
  message: string,
  metadata: Record<string, unknown> = {},
  customLogger?: Logger,
) {
  const targetLogger = customLogger || logger;
  targetLogger.info({ ...metadata }, message);
}
