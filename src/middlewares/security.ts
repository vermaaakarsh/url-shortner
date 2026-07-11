import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import type { RequestHandler } from "express";
import { ENV } from "../configs/env";

const allowedOrigins = ENV.CORS_ORIGIN.split(",").map((origin) =>
  origin.trim(),
);

export const helmetMiddleware = helmet();

export const corsMiddleware = cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

export const compressionMiddleware: RequestHandler = compression();
