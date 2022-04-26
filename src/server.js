import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import setRouter from "./appRouter.js";
import http from "http";
import cors from "cors";
import { config } from "dotenv";
config();
import middlewares from "./middlewares/middleware.js";
import "./config/bdPg.js";

console.log("Entorno-->", process.env.NODE_ENV);

const app = express();

//Parser application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Settings
app.set("port", process.env.PORT || 5000);

//Crear server
app.server = http.createServer(app);

//Cors
app.use(cors());

//Routes
setRouter(app);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(middlewares.notFoundHandler);

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
