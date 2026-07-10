import { BadRequestError, CustomError, NotFoundError } from "../errors";
import { urldb } from "../models/urldb";
import { getEncodedShortUrl } from "../utils/encoding";
import getUniqueRandomToken from "./token";

export const generateShortUrl = async (
  originalUrl: string,
): Promise<string> => {
  const { Url } = await urldb();
  const token = await getUniqueRandomToken();
  const { shortUrl, shortCode } = getEncodedShortUrl(token);

  const newUrl = new Url({ originalUrl, shortCode });
  const created = await newUrl.save();
  if (!created) {
    let error = new CustomError("Failed to create short URL");
    error.statusCode = 500;
    throw error;
  }
  return shortUrl;
};

export const activateShortUrl = async (shortCode: string): Promise<void> => {
  const { Url } = await urldb();
  const urlEntry = await Url.findOne({ shortCode, isDeleted: false });

  if (!urlEntry) {
    throw new NotFoundError("URL not found!");
  }
  if (urlEntry.isActive) {
    throw new BadRequestError("URL is already active!");
  }

  urlEntry.isActive = true;
  await urlEntry.save();
};

export const deactivateShortUrl = async (shortCode: string): Promise<void> => {
  const { Url } = await urldb();
  const urlEntry = await Url.findOne({ shortCode, isDeleted: false });

  if (!urlEntry) {
    throw new NotFoundError("URL not found!");
  }
  if (!urlEntry.isActive) {
    throw new BadRequestError("URL is already inactive!");
  }

  urlEntry.isActive = false;
  await urlEntry.save();
};

export const deleteShortUrl = async (shortCode: string): Promise<void> => {
  const { Url } = await urldb();
  const urlEntry = await Url.findOne({ shortCode, isDeleted: false });

  if (!urlEntry) {
    throw new NotFoundError("URL not found!");
  }
  if (urlEntry.isActive) {
    throw new BadRequestError(
      "URL is active. Only inactive URLs can be deleted!",
    );
  }

  urlEntry.isDeleted = true;
  await urlEntry.save();
};

export const getOriginalUrl = async (shortCode: string): Promise<string> => {
  const { Url } = await urldb();
  const urlEntry = await Url.findOne({ shortCode, isDeleted: false });
  if (!urlEntry) {
    throw new NotFoundError("Short URL not found");
  }
  return urlEntry.originalUrl;
};
