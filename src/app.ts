import express from "express";
import routes from "./routers";
import { ENV } from "./configs/env";
import {
  helmetMiddleware,
  corsMiddleware,
  compressionMiddleware,
} from "./middlewares/security";
import { errorHandler } from "./middlewares/errorHandler";
import requestLogger from "./middlewares/requestLogger";
import notFound from "./middlewares/notFound";
import { logApplicationInfo } from "./lib/logger/application";

const app = express();

app.use(
  express.json({
    limit: "100kb",
  }),
);

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(compressionMiddleware);

app.use(requestLogger);

app.use("/", routes);

app.use(notFound);
app.use(errorHandler);

app.listen(ENV.PORT, () => {
  logApplicationInfo(`Server is running on port ${ENV.PORT}`, {
    event: "server_started",
    port: ENV.PORT,
  });
});
