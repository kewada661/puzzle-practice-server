import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import "./utils/handleError.js"
import {
  usersRouter,
  authRouter,
  algorithmsRouter,
  gradesRouter,
  timesRouter
} from "./routes/index.js";

const port = 5000;
var app = express();

// if (
//   process.env.DB_HOST === undefined ||
//   process.env.DB_USER === undefined ||
//   process.env.DB_PASSWORD === undefined ||
//   process.env.DB_NAME === undefined
// ) {
//   console.error("Missing environment variables.");
//   process.exit(0);
// }

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/algorithms", algorithmsRouter);
app.use("/grades", algorithmsRouter);
app.use("/times", timesRouter);
 

const run = async () => {
  // await testConnection();

  app.get('/hello', async (req, res) => {
    res.send("<b>Hello world!</b>");
  });

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  })
}

run().catch(console.dir);
process.stdin.resume();