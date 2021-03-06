"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Seguridad = __importStar(require("../controllers/Seguridad.controller"));
const Votacion = __importStar(require("../controllers/Votaciones.controller"));
const Asamblea = __importStar(require("../controllers/Asamblea.controller"));
const r = express_1.Router();
r.get("/asociados/login", Seguridad.asociados_login);
r.post("/asociados/login", Seguridad.asociados_asistencia);
r.get("/asociados/votaciones/:codcliente", Votacion.votaciones);
r.get("/asociados/opciones/", Votacion.opciones);
r.get("/votaciones", Votacion.votaciones);
r.post("/votaciones/:codvotacion", Votacion.IniciarVotacion);
r.put("/votaciones/:codvotacion", Votacion.DetenerVotacion);
r.get("/admin/login", Seguridad.admin_login);
r.get("/asamblea/resultados", Asamblea.resultados);
r.get("/asamblea/asistencia", Asamblea.asistencia);
r.post('/asamblea/votar/', Asamblea.emitirVoto);
r.post('/asamblea/registro/', Asamblea.registro);
exports.default = r;
