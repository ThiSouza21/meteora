import { usuariosService } from "../services/UsuariosService";
import { Controller } from "./Controller";
import { UsuariosModel } from "../db/models/UsuariosModel";

class UsuariosController extends Controller<UsuariosModel> {
  constructor() {
    super(usuariosService);
  }
}

export const usuarioController = new UsuariosController();
