// 1. Define the initial parameters using BigInt literals (n-suffix)
const startNumber = 2n ** 18n; // 262,144
const rangeSize = BigInt(1.2 * Math.pow(10, 13)); // 12,000,000,000,000
const totalEntries = 46;

let currentStart = startNumber;
const entries = [];

// 2. Loop to generate the 46 sequential ranges
for (let i = 0; i < totalEntries; i++) {
  let endNumber = currentStart + rangeSize;

  entries.push({
    startNumber: currentStart,
    current: currentStart, // Set initial current to match startNumber
    endNumber: endNumber,
    rangeExpired: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Next entry starts at 1 + previous endNumber
  currentStart = endNumber + 1n;
}

// 3. Bulk insert the entries into your "tokens" collection
// (Note: Mongoose plurals "Token" to "tokens" by default)
db.tokens.insertMany(entries);
