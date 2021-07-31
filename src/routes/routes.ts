import {Router} from 'express'

const r = Router();

/**
 * Asociados
 * - Login (Firma Asistencia)
 * - Votaciones Disponibles
 * - Hacer Votacion
 * - Mostrar Resultado, cuando la votacion finalice.
 *
 * Administrador
 * - Login Administrador
 * - CRUD Votacion
 * - CRUD Opciones
 * - Iniciar Votacion
 * - Detener Votacion
 * - Ver Resultados
 * - Ver Asistencia
 */

r.get("/")

export default r