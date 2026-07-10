import express from "express";
import routes from "./routers";
import { ENV } from "./configs/env";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Server Working!");
});

app.use("/", routes);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});
