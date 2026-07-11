import type { Logger } from "pino";

declare global {
  namespace Express {
    interface Request {
      id: string;
      logger: Logger;
    }

    interface Locals {
      requestId: string;
    }
  }
}

export {};
