import { TokenModel } from "../tokendb/token";
import { getTokendbConnection } from "../../lib/mongodb";

export type { Token, TokenDocument } from "../tokendb/token";

export async function tokendb() {
  const conn = await getTokendbConnection();

  return {
    Token: TokenModel(conn),
  };
}
