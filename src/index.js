import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", router);

const port = 5001;

app.listen(port, () => {
  console.log("Server is started");
});
