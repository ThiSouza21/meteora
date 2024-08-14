"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuariosController_1 = require("../controller/UsuariosController");
const authetication_1 = require("../middlewares/authetication");
const router = (0, express_1.Router)();
router
    .get("/usuarios", authetication_1.authentication, (req, res) => UsuariosController_1.usuarioController.getUsers(req, res))
    .get("/usuarios/id/:id", authetication_1.authentication, (req, res) => UsuariosController_1.usuarioController.getUser(req, res))
    .post("/usuarios", (req, res) => UsuariosController_1.usuarioController.createUser(req, res))
    .delete("/usuarios/id/:id", authetication_1.authentication, (req, res) => UsuariosController_1.usuarioController.deletedUser(req, res))
    .put("/usuarios/id/:id", authetication_1.authentication, (req, res) => UsuariosController_1.usuarioController.updatedUser(req, res));
exports.default = router;
