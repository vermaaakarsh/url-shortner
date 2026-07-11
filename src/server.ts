import "dotenv/config";

import { ENV } from "./configs/env";
import {
  logApplicationError,
  logApplicationInfo,
} from "./lib/logger/application";
import mongoManager from "./lib/mongodb/manager";

import app from "./app";

const server = app.listen(ENV.PORT, () => {
  logApplicationInfo(`Server is running on port ${ENV.PORT}`, {
    event: "server_started",
    port: ENV.PORT,
  });
});

let isShuttingDown = false;

async function shutdown(signal: string) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  logApplicationInfo(`${signal} received. Shutting down application...`, {
    event: "server_shutdown_started",
    signal,
  });

  const forceShutdownTimeout = setTimeout(() => {
    logApplicationError(new Error("Graceful shutdown timed out."), {
      event: "server_shutdown_timeout",
    });

    process.exit(1);
  }, 10000);

  try {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });

    logApplicationInfo("HTTP server closed.", {
      event: "http_server_closed",
    });

    await mongoManager.disconnect();

    clearTimeout(forceShutdownTimeout);

    logApplicationInfo("Graceful shutdown completed.", {
      event: "server_shutdown_completed",
    });

    process.exit(0);
  } catch (error) {
    clearTimeout(forceShutdownTimeout);

    logApplicationError(error as Error, {
      event: "server_shutdown_failed",
    });

    process.exit(1);
  }
}

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});

process.on("uncaughtException", async (error) => {
  logApplicationError(error, {
    event: "uncaught_exception",
  });

  await shutdown("uncaughtException");
});

process.on("unhandledRejection", async (reason) => {
  logApplicationError(reason as Error, {
    event: "unhandled_rejection",
  });

  await shutdown("unhandledRejection");
});
