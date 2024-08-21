"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const UsuariosService_1 = require("../services/UsuariosService");
const Controller_1 = require("./Controller");
class UsuariosController extends Controller_1.Controller {
    constructor() {
        super(UsuariosService_1.usuariosService);
    }
}
exports.usuarioController = new UsuariosController();
