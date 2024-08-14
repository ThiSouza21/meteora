import db from "../models";
import { Service } from "./Service";

class UsuariosService extends Service<typeof db.usuarios> {}

export const usuariosService = new UsuariosService("usuarios");
