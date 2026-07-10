import { type ErrorRequestHandler } from "express";
import logger from "../lib/logger";

export const errorHandler: ErrorRequestHandler = (err: any, req, res, next) => {
  // Normalize status code: use provided numeric statusCode or default to 500
  let statusCode =
    typeof err?.statusCode === "number" && err.statusCode > 0
      ? err.statusCode
      : 500;

  const isServerError = statusCode >= 500;

  // Log server errors for debugging
  if (isServerError) {
    logger.error(err, err.message);
  }

  if (typeof err.statusCode === "number" && err.statusCode > 500) {
    statusCode = 500; // Ensure server errors are treated as 500
  }

  return res.status(statusCode).json({
    success: false,
    message: isServerError ? "Internal Server Error!" : err?.message || "Error",
    data: {},
  });
};
