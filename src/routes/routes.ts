import {Router} from 'express'
import * as Seguridad from "../controllers/Seguridad.controller"
import {asociados_login} from "../controllers/Seguridad.controller";
const r = Router();

r.get(
    "/asociados/login",
    Seguridad.asociados_login
    )

r.get(
    "/admin/login"
)

export default r