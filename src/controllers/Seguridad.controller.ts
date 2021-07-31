import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import {getConnection, mssql} from "../database";
import {JsonOut} from "../middlewares/JsonOut";

export const login = async (req: Request,
                            res: Response) => {
    let Connection = null
    const {cui, cuenta} = req.body;
    try{
        Connection = await getConnection()
        const sp = await Connection.request();
        sp.input("StrCui", mssql.VarChar(100), cui)
        sp.input("NumCuenta", mssql.VarChar(100), cuenta)
        sp.output("CodMsj", mssql.Int)
        sp.output("StrMsj", mssql.VarChar(400))
        sp.execute('Asociados.sp_login', (error: any, results: any)=>{
            if (!error){
                return res.status(200).send(JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset))
            }else{
                return res.status(500).send(JsonOut('0', "Se produjo un error al ejecutar", error))
            }
        })


    }catch(e: any){
        const {Code, Message} = Connection;
        return res.status(500).send({code: Code, Message: Message})
    }
}