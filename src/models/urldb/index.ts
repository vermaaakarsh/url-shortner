import { UrlModel } from "./url";
import { getUrldbConnection } from "../../lib/mongodb";

export type { Url, UrlDocument } from "./url";

export async function urldb() {
  const conn = await getUrldbConnection();

  return {
    Url: UrlModel(conn),
  };
}
