import {Router} from 'express'
import * as Seguridad from "../controllers/Seguridad.controller"
import * as Votacion from "../controllers/Votaciones.controller"
const r = Router();

r.get(
    "/asociados/login",
    Seguridad.asociados_login
    )

r.get("/asociados/votaciones/:codcliente",
    Votacion.votaciones
    )

r.get("/asociados/opciones/",
    Votacion.opciones)

r.get(
    "/admin/login",
    Seguridad.admin_login
)

export default r