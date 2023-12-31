import express from "express";
import { logger } from "./lib.js";
import router from "./dictionary-routes.js";

const app = express();
app.use(express.json());
app.use(logger);
app.use("/", express.static("./client"));
app.use("/dictionary", router);

export default app;
