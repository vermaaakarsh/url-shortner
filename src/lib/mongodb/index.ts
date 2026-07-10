import mongo from "./manager";

export async function getUrldbConnection() {
  return mongo.connect("urldb");
}

export async function getTokendbConnection() {
  return mongo.connect("tokendb");
}
