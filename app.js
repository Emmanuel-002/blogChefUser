import express from "express";
import { join } from "path";
import { createWriteStream } from "fs";
import morgan from "morgan";
import session from "./session";
import compression from "compression";
import home from "./routes/home";
import admin from "./routes/admin";
import api from "./routes/api";
import connectToDb from "./db";
import helmet from "helmet";

const app = express();
const logFile = join(__dirname, "blogchef.log");
// const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());
app.use("/assets", express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "public", "client")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("trust proxy", 1);
app.use("/admin", session(app));
app.use(morgan(":method - :url - :date - :response-time ms"));
app.use(
  morgan(":method - :url - :date - :response-time ms", {
    stream: createWriteStream(logFile, { flags: "a" }),
  })
);

app.set("view engine", "pug");

app.use("/admin", admin);
app.use("/api", api);
app.use("/", home);

Promise.all([connectToDb()])
  .then(() =>
    app.listen(process.env.PORT, () => console.log(`Blog Chef is cooking on port 3000 ${process.env.PORT}`))
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit();
  });
