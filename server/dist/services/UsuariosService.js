"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosService = void 0;
const Service_1 = require("./Service");
const UsuariosModel_1 = require("../db/models/UsuariosModel");
class UsuariosService extends Service_1.Service {
    constructor() {
        super(UsuariosModel_1.UsuariosModel);
    }
}
exports.usuariosService = new UsuariosService();
