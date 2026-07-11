import type { Request, Response } from "express";
import healthService from "../services/healthService";
import { logApplicationInfo } from "../lib/logger/application";

export const getHealth = (req: Request, res: Response) => {
  logApplicationInfo(
    "Health check requested",
    {
      event: "health_check",
    },
    req.logger,
  );
  res.status(200).json({
    success: true,
    data: healthService.getStatus(),
  });
};
