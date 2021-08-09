import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import {getConnection, mssql} from "../database";
import {JsonOut} from "../middlewares/JsonOut";
import config from "../config/config";

const createToken = (UserInfo: any) => {
    return jwt.sign(UserInfo, config.jwtSecret)
}
export const asociados_asistencia = async (req: Request, res: Response) => {
    let Connection = null
    console.log(req.body)
    return res.status(200).send(JsonOut("1", "Asistencia registrada con exito", req.body))
}

export const asociados_login = async (req: Request,
                                      res: Response) => {
    let Connection = null
    const {cui, cuenta} = req.body;
    try {
        Connection = await getConnection()
        const sp = await Connection.request();
        sp.input("StrCui", mssql.VarChar(100), cui)
        sp.input("NumCuenta", mssql.VarChar(100), cuenta)
        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Asociados.sp_login', (error: any, results: any) => {
            if (!error) {
                if (results.output.CodMsj == 1) {
                    const UserInfo: any = results.recordset[0];
                    UserInfo.Token = createToken(UserInfo);
                    return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, UserInfo))
                }

                return res.status(401).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset))


            } else {
                return res.status(500).send(JsonOut('0', "Se produjo un error al ejecutar", error))
            }
        })


    } catch (e: any) {
        const {Code, Message} = Connection;
        return res.status(500).send({code: Code, Message: Message})
    }
}

export const admin_login = async (req: Request,
                                  res: Response) => {
    let Connection = null
    const {StrUsuario, StrClave} = req.body;
    try {
        Connection = await getConnection()
        const sp = await Connection.request();
        sp.input("StrUsuario", mssql.VarChar(100), StrUsuario)
        sp.input("StrClave", mssql.VarChar(100), StrClave)
        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Seguridad.sp_login', (error: any, results: any) => {
            if (!error) {
                if (results.output.CodMsj == 1) {
                    const UserInfo: any = results.recordset[0];
                    UserInfo.Token = createToken(UserInfo);
                    return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, UserInfo))
                }

                return res.status(401).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset))


            } else {
                console.log(error)
                return res.status(500).send(JsonOut('0', "Se produjo un error al ejecutar", error))
            }
        })


    } catch (e: any) {
        const {Code, Message} = Connection;
        return res.status(500).send({code: Code, Message: Message})
    }
}