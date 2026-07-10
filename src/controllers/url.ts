import type { RequestHandler } from "express";
import { generateShortUrl, getOriginalUrl } from "../services/url";
import {
  validateOriginalUrl,
  validateShortCode,
} from "../validators/urlValidators";
import { NotFoundError, UnprocessableEntityError } from "../errors";

export const generateShortUrlController: RequestHandler = async (
  req,
  res,
  next,
) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl || !validateOriginalUrl(originalUrl)) {
      throw new UnprocessableEntityError("Valid URL is required");
    }

    const shortUrl = await generateShortUrl(originalUrl);
    res.status(200).send({
      success: true,
      message: "Short URL generated successfully",
      data: { shortUrl },
    });
  } catch (error) {
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
      throw new UnprocessableEntityError("Valid short URL is required");
    }
    const originalUrl: string | null = await getOriginalUrl(shortCode);
    if (!originalUrl) {
      throw new NotFoundError("URL not found");
    }
    res.redirect(originalUrl);
  } catch (error: any) {
    next(error);
  }
};
