import type { Logger } from "pino";
import logger from "./index";

export function createRequestLogger(requestId: string): Logger {
  return logger.child({ requestId, context: "request" });
}

export function logRequestStart(
  logger: Logger,
  metadata: Record<string, unknown>,
): void {
  logger.info({ event: "request_started", ...metadata }, "Incoming request");
}

export function logRequestComplete(
  logger: Logger,
  metadata: Record<string, unknown>,
): void {
  logger.info({ event: "request_completed", ...metadata }, "Request completed");
}
