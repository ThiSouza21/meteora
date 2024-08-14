import express from "express";
import usuarios from "./usuarios";
import auth from "./auth";
import cors from "cors";

type App = express.Application;

export const router = (app: App) => {
  
  app.use(express.json(), cors(), auth, usuarios);
};
