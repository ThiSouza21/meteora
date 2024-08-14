import { Request, Response, Router } from "express";
import { usuarioController } from "../controller/UsuariosController";
import { authentication } from "../middlewares/authetication";
import { CustomRequest } from "../interfaces/CustomRequest";
const router = Router();

router
  .get("/usuarios", authentication, (req: CustomRequest, res: Response) =>
    usuarioController.getUsers(req, res)
  )
  .get(
    "/usuarios/id/:id",
    authentication,
    (req: CustomRequest, res: Response) => usuarioController.getUser(req, res)
  )
  .post("/usuarios", (req: Request, res: Response) =>
    usuarioController.createUser(req, res)
  )
  .delete(
    "/usuarios/id/:id",
    authentication,
    (req: CustomRequest, res: Response) =>
      usuarioController.deletedUser(req, res)
  )
  .put(
    "/usuarios/id/:id",
    authentication,
    (req: CustomRequest, res: Response) =>
      usuarioController.updatedUser(req, res)
  );

export default router;
