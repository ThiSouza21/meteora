import { Service } from "./Service";
import { UsuariosModel } from "../db/models/UsuariosModel";

class UsuariosService extends Service<UsuariosModel> {
  constructor() {
    super(UsuariosModel);
  }
}

export const usuariosService = new UsuariosService();
