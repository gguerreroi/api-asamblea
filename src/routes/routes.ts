import {Router} from 'express'
import * as Seguridad from "../controllers/Seguridad.controller"
import * as Votacion from "../controllers/Votaciones.controller"
import * as Asamblea from "../controllers/Asamblea.controller"
const r = Router();

r.get("/asociados/login", Seguridad.asociados_login)
r.get("/asociados/votaciones/:codcliente", Votacion.votaciones)
r.get("/asociados/opciones/", Votacion.opciones)
r.get("/votaciones", Votacion.votaciones)
r.get("/admin/login", Seguridad.admin_login)
r.get("/asamblea/resultados", Asamblea.resultados)
r.post('/asamblea/votar/', Asamblea.emitirVoto)

export default r