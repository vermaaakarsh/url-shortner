import type { RequestHandler } from "express";
import {
  generateShortUrl,
  activateShortUrl,
  deactivateShortUrl,
  deleteShortUrl,
  getOriginalUrl,
} from "../services/url";
import { validateShortCode } from "../validators/urlValidators";
import { NotFoundError, UnprocessableEntityError } from "../errors";
import { logApplicationInfo } from "../lib/logger/application";

export const generateShortUrlController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl || !URL.canParse(originalUrl)) {
      throw new UnprocessableEntityError("Valid URL is required!");
    }

    const shortUrl = await generateShortUrl(originalUrl);

    logApplicationInfo(
      "Short URL created successfully",
      {
        event: "url_created",
        shortUrl,
        originalUrl,
      },
      req.logger,
    );

    res.status(201).send({
      success: true,
      message: "Short URL generated successfully.",
      data: { shortUrl },
    });
  } catch (error) {
    next(error);
  }
};

export const activateShortUrlController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const shortCodeParam = req.params.shortCode;
    const shortCode = Array.isArray(shortCodeParam)
      ? shortCodeParam[0]
      : shortCodeParam;

    if (!shortCode || !validateShortCode(shortCode)) {
      throw new UnprocessableEntityError("Valid short URL is required!");
    }

    await activateShortUrl(shortCode);

    logApplicationInfo(
      "Short URL activated",
      {
        event: "url_activated",
        shortCode,
      },
      req.logger,
    );

    res
      .status(200)
      .send({ success: true, message: "Short URL activated.", data: {} });
  } catch (error: any) {
    next(error);
  }
};

export const deactivateShortUrlController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const shortCodeParam = req.params.shortCode;
    const shortCode = Array.isArray(shortCodeParam)
      ? shortCodeParam[0]
      : shortCodeParam;

    if (!shortCode || !validateShortCode(shortCode)) {
      throw new UnprocessableEntityError("Valid short URL is required!");
    }

    await deactivateShortUrl(shortCode);

    logApplicationInfo(
      "Short URL deactivated",
      {
        event: "url_deactivated",
        shortCode,
      },
      req.logger,
    );

    res
      .status(200)
      .send({ success: true, message: "Short URL deactivated.", data: {} });
  } catch (error: any) {
    next(error);
  }
};

export const deleteShortUrlController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const shortCodeParam = req.params.shortCode;
    const shortCode = Array.isArray(shortCodeParam)
      ? shortCodeParam[0]
      : shortCodeParam;

    if (!shortCode || !validateShortCode(shortCode)) {
      throw new UnprocessableEntityError("Valid short URL is required!");
    }

    await deleteShortUrl(shortCode);

    logApplicationInfo(
      "Short URL deleted",
      {
        event: "url_deleted",
        shortCode,
      },
      req.logger,
    );

    res
      .status(200)
      .send({ success: true, message: "Short URL deleted.", data: {} });
  } catch (error: any) {
    next(error);
  }
};

export const getOriginalUrlController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const shortCodeParam = req.params.shortCode;
    const shortCode = Array.isArray(shortCodeParam)
      ? shortCodeParam[0]
      : shortCodeParam;

    if (!shortCode || !validateShortCode(shortCode)) {
      throw new UnprocessableEntityError("Valid short URL is required!");
    }
    const originalUrl: string | null = await getOriginalUrl(shortCode);
    if (!originalUrl) {
      throw new NotFoundError("URL not found!");
    }

    logApplicationInfo(
      "Redirecting to original URL",
      {
        event: "redirect",
        shortCode,
        targetUrl: originalUrl,
      },
      req.logger,
    );

    res.status(302).redirect(originalUrl);
  } catch (error: any) {
    next(error);
  }
};
