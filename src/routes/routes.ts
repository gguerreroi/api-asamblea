import {Router} from 'express'
import * as Seguridad from "../controllers/Seguridad.controller"
const r = Router();

r.get(
    "/asociados/login",
    Seguridad.login
    )

export default r