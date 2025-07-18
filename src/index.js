import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "https://headline-generator-seven.vercel.app",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/", router);

const port = 5001;

app.listen(port, () => {
  console.log("Server is started");
});
