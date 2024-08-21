"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const authetication_1 = require("../middlewares/authetication");
const router = (0, express_1.Router)();
router
    .post("/auth/login", (req, res) => AuthController_1.authController.authLogin(req, res))
    .get("/auth/check", authetication_1.authentication, (req, res) => {
    res.status(200).json({ message: "Usuário autenticado" });
})
    .post("/auth/logout", authetication_1.authentication, (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout bem-sucedido" });
});
exports.default = router;
