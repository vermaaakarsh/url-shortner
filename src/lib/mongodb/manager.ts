import mongoose, { type Connection } from "mongoose";
import { mongoConfigs } from "../../configs/mongodb";

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

    const connection = mongoose.createConnection(config.uri).asPromise();
    this.connections.set(name, connection);

    return connection;
  }
}

export default MongoManager.getInstance();
