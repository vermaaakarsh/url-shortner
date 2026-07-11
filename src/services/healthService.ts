import { ENV } from "../configs/env";
import { CONNECTION_STATUS } from "../constants";
import mongoManager from "../lib/mongodb/manager";

class HealthService {
  getStatus() {
    const mongo = mongoManager.getConnectionStatus();

    const statuses = Object.values(mongo);

    const isHealthy = statuses.every(
      (status) =>
        status === CONNECTION_STATUS.CONNECTED ||
        status === CONNECTION_STATUS.CONNECTING ||
        status === CONNECTION_STATUS.IDLE,
    );

    return {
      status: isHealthy ? "ok" : "degraded",
      uptime: process.uptime(),
      timestamp: new Date(),
      environment: ENV.NODE_ENV,
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage(),
      mongo,
    };
  }
}

export default new HealthService();
