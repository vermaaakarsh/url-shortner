import { ENV } from "../configs/env";

export const validateOriginalUrl = (originalUrl: string): boolean => {
  const urlPattern =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\?.*)?(#.*)?$/i;
  return urlPattern.test(originalUrl);
};

export const validateShortCode = (shortCode: string): boolean => {
  const CUSTOM_ENCODING = ENV.CUSTOM_ENCODING;

  const shortCodePattern = new RegExp(`^[${CUSTOM_ENCODING}]{3,8}$`);

  return shortCodePattern.test(shortCode);
};
