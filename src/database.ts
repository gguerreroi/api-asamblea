/**
 * @fileoverview Connection for the database
 *
 * @author Gabriel Guerrero
 * @version 1.0
 *
 **/

import config from './config/config'

export const mssql = require('mssql');
let pool: any;

export async function getConnection(){
    const ConnectionString = {
        user: config.DB.USER,
        password: config.DB.PASSWORD,
        server: config.DB.HOST,
        database: config.DB.DATABASE,
        options: {
            encrypt: false,
            enableArithAbort: true
        }
    }

    let conPool = new mssql.ConnectionPool(ConnectionString)

    try{
        pool = await conPool.connect();
        pool.on("error", async function (e: any) {
            console.log("connection pool error", e);
            await closePool();
        });
        return pool;
    }catch(e: any){
        pool = null;
        return {
            Code: e.code,
            Message: e.message
        }
    }
}


async function closePool() {
    try {
        await pool.close();
        pool = null;
    } catch (e) {
        pool = null;
        console.error("Error", e)
    }
}