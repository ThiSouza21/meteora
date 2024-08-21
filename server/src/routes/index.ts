import express from "express";
import usuarios from "./usuarios";
import auth from "./auth";
import cookieParser from "cookie-parser";
import cors from "cors";

type App = express.Application;

export const router = (app: App) => {
  app.use(
    express.json(),
    cookieParser(),
    cors({
      origin: "http://localhost:5173",
      credentials: true,
      methods: "GET,PUT,POST,OPTIONS,DELETE",
      allowedHeaders:
        "Access-Control-Allow-Headers,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
    })
  );

  app.use(auth, usuarios);
};
