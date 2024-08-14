import { Model } from "sequelize";
import db from "../models";
import { usuariosService } from "../services/UsuariosService";
import { Controller } from "./Controller";

class UsuariosController extends Controller<typeof db.usuarios> {}

export const usuarioController = new UsuariosController(usuariosService);
