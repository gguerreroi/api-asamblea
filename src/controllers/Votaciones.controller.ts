import {Request, Response} from "express";
import {getConnection, mssql} from "../database";
import {JsonOut} from "../middlewares/JsonOut";

export async function votaciones(req: Request, res: Response) {
    let Connection = null
    const {codcliente} = req.params;
    try {
        Connection = await getConnection()
        const sp = await Connection.request();
        if (codcliente != undefined)
            sp.input("CodCliente", mssql.Int, codcliente)
        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Votaciones.sp_core', (error: any, results: any) => {

            if (!error)
                return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset));


            return res.status(200).send(JsonOut("1", "Lista de votaciones", []));
        })
    } catch (e: any) {
        console.log("entro a error")
        const {Code, Message} = Connection;
        return res.status(200).send(JsonOut("0", "Lista de votaciones", []));
    }
}

export async function IniciarVotacion(req: Request, res: Response) {
    let Connection = null
    const {codvotacion} = req.params;
    try {
        Connection = await getConnection()
        const sp = await Connection.request();

        sp.input("codvotacion", mssql.Int, codvotacion)
        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Votaciones.sp_iniciar', (error: any, results: any) => {
            if (!error)
                return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset));

            return res.status(200).send(JsonOut('0', 'Sin Datos'));
        })
    } catch (e: any) {
        const {Code, Message} = Connection;
        return res.status(200).send(JsonOut(Code, Message, e));
    }
}

export async function DetenerVotacion(req: Request, res: Response) {
    let Connection = null
    const {codvotacion} = req.params;
    try {
        Connection = await getConnection()
        const sp = await Connection.request();

        sp.input("codvotacion", mssql.Int, codvotacion)
        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Votaciones.sp_detener', (error: any, results: any) => {
            if (!error)
                return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset));

            return res.status(200).send(JsonOut('0', 'Sin Datos'));
        })
    } catch (e: any) {
        const {Code, Message} = Connection;
        return res.status(200).send(JsonOut(Code, Message, e));
    }
}

export async function iucore(req: Request, res: Response) {
    let Connection = null
    const {codvotaciones} = req.params;
    const {strtitulo, strdescripcion} = req.body;
    try {
        Connection = await getConnection()
        const sp = await Connection.request();

        sp.input("codvotacion", mssql.Int, codvotaciones)
        sp.input("strtitulo", mssql.VarChar(200), strtitulo)
        sp.input("strdescripcion", mssql.VarChar(200), strdescripcion)
        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Votaciones.sp_iucore', (error: any, results: any) => {
            if (!error)
                return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset));

            return res.status(200).send(JsonOut('0', 'Sin Datos'));
        })
    } catch (e: any) {
        const {Code, Message} = Connection;
        return res.status(200).send(JsonOut(Code, Message, e));
    }
}

export async function opciones(req: Request, res: Response) {
    let Connection = null
    try {
        Connection = await getConnection()
        const sp = await Connection.request();

        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Votaciones.sp_opciones', (error: any, results: any) => {
            if (!error)
                return res.status(200).send(JsonOut('1', 'Lista de Opciones', results.recordset));

            return res.status(200).send(JsonOut('0', 'Sin Datos'));
        })
    } catch (e: any) {
        const {Code, Message} = Connection;
        return res.status(200).send(JsonOut(Code, Message, e));
    }
}
