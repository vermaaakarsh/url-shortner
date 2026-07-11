import type { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors";
import { logApplicationWarn } from "../lib/logger/application";

export default function notFound(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  logApplicationWarn(
    `Unknown route requested: ${req.originalUrl}`,
    {
      event: "route_not_found",
      method: req.method,
      path: req.originalUrl,
    },
    req.logger,
  );

  next(new NotFoundError(`Route '${req.originalUrl}' not found!`));
}
