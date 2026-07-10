import type { RequestHandler } from "express";
import { generateShortUrl, getOriginalUrl } from "../services/url";
import {
  validateOriginalUrl,
  validateShortCode,
} from "../validators/urlValidators";

export const generateShortUrlController: RequestHandler = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl || !validateOriginalUrl(originalUrl)) {
      throw new Error("Valid original URL is required");
    }

    const shortUrl = await generateShortUrl(originalUrl);
    res.status(200).send({
      message: "Short URL generated successfully",
      data: { shortUrl },
    });
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getOriginalUrlController: RequestHandler = async (req, res) => {
  try {
    const shortCodeParam = req.params.shortCode;
    const shortCode = Array.isArray(shortCodeParam)
      ? shortCodeParam[0]
      : shortCodeParam;

    if (!shortCode || !validateShortCode(shortCode)) {
      return res.status(400).send({ message: "Valid short URL is required" });
    }
    const originalUrl: string | null = await getOriginalUrl(shortCode);
    if (!originalUrl) {
      return res.status(404).send({ message: "Short URL not found" });
    }
    res.redirect(originalUrl);
  } catch (err: any) {
    res.status(500).send({
      message: err.message,
    });
  }
};
