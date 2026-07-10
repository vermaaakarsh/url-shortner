import express from "express";
import routes from "./routers";
import { ENV } from "./configs/env";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.send({ success: true, message: "Server Working!", data: {} });
});

app.use("/", routes);

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
