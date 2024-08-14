"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controller/AuthController");
const router = (0, express_1.Router)();
router.post("/auth/login", (req, res) => AuthController_1.authController.authLogin(req, res));
exports.default = router;
