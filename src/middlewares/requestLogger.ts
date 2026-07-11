import crypto from "crypto";
import type { RequestHandler } from "express";
import {
  createRequestLogger,
  logRequestComplete,
  logRequestStart,
} from "../lib/logger/request";

const requestLogger: RequestHandler = (req, res, next) => {
  const requestId = crypto.randomUUID();
  const childLogger = createRequestLogger(requestId);

  (req as any).id = requestId;
  (req as any).logger = childLogger;
  res.locals.requestId = requestId;

  const startTime = process.hrtime.bigint();

  logRequestStart(childLogger, {
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
    headers: {
      host: req.headers.host,
      userAgent: req.headers["user-agent"],
    },
  });

  res.on("finish", () => {
    const durationMs = Number(process.hrtime.bigint() - startTime) / 1_000_000;
    logRequestComplete(childLogger, {
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      responseTimeMs: Number(durationMs.toFixed(3)),
    });
  });

  next();
};

export default requestLogger;
