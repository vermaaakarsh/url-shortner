import {
  Schema,
  Model,
  type Connection,
  type HydratedDocument,
  type InferSchemaType,
} from "mongoose";

export const TokenSchema = new Schema(
  {
    startNumber: {
      type: BigInt,
      required: true,
    },
    current: {
      type: BigInt,
      required: true,
    },
    endNumber: {
      type: BigInt,
      required: true,
    },
    rangeExpired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export type Token = InferSchemaType<typeof TokenSchema>;
export type TokenDocument = HydratedDocument<Token>;

export function TokenModel(connection: Connection): Model<Token> {
  return connection.models.Token || connection.model("Token", TokenSchema);
}
