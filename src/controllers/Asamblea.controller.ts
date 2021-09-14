import {Request, Response} from "express";
import {getConnection, mssql} from "../database";
import {JsonOut} from "../middlewares/JsonOut";

export async function emitirVoto(req: Request, res: Response) {
    let Connection = null
    const {codvotacion, codopcion, codcliente} = req.body;
    try {
        Connection = await getConnection()
        const sp = await Connection.request();
        sp.input("CodVotacion", mssql.Int, codvotacion)
        sp.input("CodOpcion", mssql.Int, codopcion)
        sp.input("CodCliente", mssql.Int, codcliente)
        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Asamblea.sp_emitir_voto', (error: any, results: any) => {

            if (!error) {

                return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset));
            }


            return res.status(200).send(JsonOut("0", "Se produjo un error", error));
        })
    } catch (e: any) {
        console.log("entro a error")
        const {Code, Message} = Connection;
        return res.status(200).send(JsonOut("0", "Lista de votaciones", []));
    }
}

export async function registro(req: Request,
                               res: Response) {
    let Connection = null
    const {strdpi, strtelefono} = req.body;
    try {
        Connection = await getConnection()
        const sp = await Connection.request();

        sp.input("StrDpi", mssql.VarChar(100), strdpi)
        sp.input("StrTelefono", mssql.VarChar(100), strtelefono)

        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Asamblea.sp_preregistro', (error: any, results: any) => {

            if (!error) {

                return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset));
            }


            return res.status(200).send(JsonOut("0", "Se produjo un error", error));
        })
    } catch (e: any) {
        console.log("entro a error")
        const {Code, Message} = Connection;
        return res.status(200).send(JsonOut("0", "Lista de votaciones", []));
    }
}

export async function asistencia(req: Request, res: Response) {
    let Connection = null

    try {
        Connection = await getConnection()
        const sp = await Connection.request();

        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Asamblea.sp_asistencia', (error: any, results: any) => {

            if (!error) {

                return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset));
            }


            return res.status(200).send(JsonOut("0", "Se produjo un error", error));
        })
    } catch (e: any) {
        console.log("entro a error")
        const {Code, Message} = Connection;
        return res.status(200).send(JsonOut("0", "Lista de votaciones", []));
    }
}

export async function resultados(req: Request, res: Response) {
    let Connection = null

    try {
        Connection = await getConnection()
        const sp = await Connection.request();

        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Asamblea.sp_resultados', (error: any, results: any) => {

            if (!error) {

                return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset));
            }


            return res.status(200).send(JsonOut("0", "Se produjo un error", error));
        })
    } catch (e: any) {
        console.log("entro a error")
        const {Code, Message} = Connection;
        return res.status(200).send(JsonOut("0", "Lista de votaciones", []));
    }
}