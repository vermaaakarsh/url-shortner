import mongoose, { type Connection } from "mongoose";
import { mongoConfigs } from "../../configs/mongodb";
import {
  logApplicationInfo,
  logApplicationWarn,
  logApplicationError,
} from "../logger/application";
import { CONNECTION_STATUS } from "../../constants";

class MongoManager {
  private static instance: MongoManager;

  private readonly connections = new Map<
    keyof typeof mongoConfigs,
    Promise<Connection>
  >();

  private readonly activeConnections = new Map<
    keyof typeof mongoConfigs,
    Connection
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
        this.activeConnections.set(name, conn);

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
        this.connections.delete(name);

        logApplicationError(err, {
          event: "db_connection_failed",
          dbName: name,
        });
      });

    this.connections.set(name, connectionPromise);

    return connectionPromise;
  }

  getConnectionStatus() {
    const status: Record<string, string> = {};

    for (const name of Object.keys(mongoConfigs) as Array<
      keyof typeof mongoConfigs
    >) {
      const connection = this.activeConnections.get(name);

      if (!connection) {
        status[name] = CONNECTION_STATUS.IDLE;
        continue;
      }

      switch (connection.readyState) {
        case 1:
          status[name] = CONNECTION_STATUS.CONNECTED;
          break;

        case 2:
          status[name] = CONNECTION_STATUS.CONNECTING;
          break;

        default:
          status[name] = CONNECTION_STATUS.DISCONNECTED;
      }
    }

    return status;
  }
}

export default MongoManager.getInstance();
