import express from "express";
import routes from "./routers";
import { ENV } from "./configs/env";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./lib/logger";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  logger.info("Health check requested");
  res.send({ success: true, message: "Server Working!", data: {} });
});

app.use("/", routes);

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  logger.info(`Server is running on port ${ENV.PORT}`);
});
