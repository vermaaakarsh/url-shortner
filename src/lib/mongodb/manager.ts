import mongoose, { type Connection } from "mongoose";
import { mongoConfigs } from "../../configs/mongodb";
import {
  logApplicationInfo,
  logApplicationWarn,
  logApplicationError,
} from "../logger/application";

class MongoManager {
  private static instance: MongoManager;

  private readonly connections = new Map<
    keyof typeof mongoConfigs,
    Promise<Connection>
  >();

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new MongoManager();
    }
    return this.instance;
  }

  async connect(name: keyof typeof mongoConfigs) {
    if (this.connections.has(name)) {
      return this.connections.get(name)!;
    }

    const config = mongoConfigs[name];

    logApplicationInfo(`Attempting to connect to ${name} database`, {
      event: "db_connection_attempt",
      dbName: name,
    });

    const connectionPromise = mongoose.createConnection(config.uri).asPromise();

    connectionPromise
      .then((conn) => {
        logApplicationInfo(`Successfully connected to ${name} database`, {
          event: "db_connection_success",
          dbName: name,
        });

        conn.on("disconnected", () => {
          logApplicationWarn(`Disconnected from ${name} database`, {
            event: "db_disconnected",
            dbName: name,
          });
        });

        conn.on("error", (err: Error) => {
          logApplicationError(err, {
            event: "db_error",
            dbName: name,
          });
        });
      })
      .catch((err: Error) => {
        logApplicationError(err, {
          event: "db_connection_failed",
          dbName: name,
        });
      });

    this.connections.set(name, connectionPromise);

    return connectionPromise;
  }
}

export default MongoManager.getInstance();
