import { ENV } from "../configs/env";

const customEncoding = ENV.CUSTOM_ENCODING;
export const getEncodedShortUrl = (
  token: bigint,
): { shortUrl: string; shortCode: string } => {
  if (token === 0n) {
    return {
      shortUrl: `${ENV.SHORT_URL_PREFIX}${customEncoding[0]}`,
      shortCode: `${customEncoding[0]}`,
    };
  }
  let result = "";
  const mask = 63n; // Binary: 0b111111 (isolates the lowest 6 bits)

  while (token > 0n) {
    // 1. Grab the last 6 bits of the number
    let sixBitValue = Number(token & mask);

    // 2. Look up the character at that index in your custom mapping
    let char = customEncoding[sixBitValue];

    // 3. Prepend it to the result
    result = char + result;

    // 4. Shift right by 6 bits to move to the next chunk
    token = token >> 6n;
  }

  return { shortUrl: `${ENV.SHORT_URL_PREFIX}${result}`, shortCode: result };
};
