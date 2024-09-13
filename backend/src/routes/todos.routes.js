import { Router } from "express";
import { getAllTodosCtrl } from "../controllers/todos.controllers.js";
import validarJwt from "../helpers/generar-jwt.js"
const todosRouter = Router();

todosRouter.get("/", getAllTodosCtrl);

export { todosRouter };
