import {
  Schema,
  Model,
  type Connection,
  type InferSchemaType,
  type HydratedDocument,
} from "mongoose";

export const UrlSchema = new Schema(
  {
    shortCode: {
      type: String,
      required: true,
      indexed: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export type Url = InferSchemaType<typeof UrlSchema>;
export type UrlDocument = HydratedDocument<Url>;

export function UrlModel(connection: Connection): Model<Url> {
  return connection.models.Url || connection.model("Url", UrlSchema);
}
