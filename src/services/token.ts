import { tokendb } from "../models/tokendb";

export default async function getUniqueRandomToken(): Promise<bigint> {
  const { Token } = await tokendb();

  const ranges = await Token.find({
    rangeExpired: false,
  });

  let randomRange = ranges[Math.floor(Math.random() * ranges.length)];

  if (!randomRange) {
    throw new Error("No range available");
  }

  const updated = await Token.findOneAndUpdate(
    {
      _id: randomRange._id,
      rangeExpired: false,
      current: randomRange.current,
    },
    [
      {
        $set: {
          current: {
            $add: ["$current", 1],
          },
        },
      },
      {
        $set: {
          rangeExpired: {
            $gte: ["$current", "$endNumber"],
          },
        },
      },
    ],
    {
      updatePipeline: true,
    },
  );

  if (!updated) {
    throw new Error("Failed to fetch token. Please try again.");
  }
  return updated.current;
}
