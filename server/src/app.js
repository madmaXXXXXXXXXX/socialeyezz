import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json({ limit: "16Kb" })); //size of json

app.use(express.urlencoded({ extended: true, limit: "16Kb" })); //handlind search url
app.use(express.static("public")); //storing files in folder in local server
app.use(cookieParser());

//routess

import userRouter from "./routes/user.routes.js";


app.use("/api/v1/users", userRouter);

export { app };
