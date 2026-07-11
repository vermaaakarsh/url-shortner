import express, { type Express } from "express";
import routes from "./routers";
import {
  helmetMiddleware,
  corsMiddleware,
  compressionMiddleware,
} from "./middlewares/security";
import { errorHandler } from "./middlewares/errorHandler";
import requestLogger from "./middlewares/requestLogger";
import notFound from "./middlewares/notFound";

const app: Express = express();

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

export default app;
