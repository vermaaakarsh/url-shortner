import express from "express";
import routes from "./routers";
import { ENV } from "./configs/env";
import { errorHandler } from "./middlewares/errorHandler";
import requestLogger from "./middlewares/requestLogger";
import { logApplicationInfo } from "./lib/logger/application";

const app = express();

app.use(express.json());

app.use(requestLogger);

app.get("/health", (req, res) => {
  logApplicationInfo(
    "Health check requested",
    {
      event: "health_check",
    },
    req.logger,
  );
  res.send({ success: true, message: "Server Working!", data: {} });
});

app.use("/", routes);

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  logApplicationInfo(`Server is running on port ${ENV.PORT}`, {
    event: "server_started",
    port: ENV.PORT,
  });
});
