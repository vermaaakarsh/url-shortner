import { CustomError } from "../errors";
import { tokendb } from "../models/tokendb";

export default async function getUniqueRandomToken(): Promise<bigint> {
  const { Token } = await tokendb();

  const ranges = await Token.find({
    rangeExpired: false,
  });

  let randomRange = ranges[Math.floor(Math.random() * ranges.length)];

  if (!randomRange) {
    let error = new CustomError(
      "No available token ranges. Please try again later.",
    );
    error.statusCode = 503;
    throw error;
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
    let error = new CustomError(
      "Failed to update the token range. Please try again.",
    );
    error.statusCode = 500;
    throw error;
  }
  return updated.current;
}
