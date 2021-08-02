"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin_login = exports.asociados_login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
const JsonOut_1 = require("../middlewares/JsonOut");
const config_1 = __importDefault(require("../config/config"));
const createToken = (UserInfo) => {
    return jsonwebtoken_1.default.sign(UserInfo, config_1.default.jwtSecret);
};
const asociados_login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Connection = null;
    const { cui, cuenta } = req.body;
    try {
        Connection = yield database_1.getConnection();
        const sp = yield Connection.request();
        sp.input("StrCui", database_1.mssql.VarChar(100), cui);
        sp.input("NumCuenta", database_1.mssql.VarChar(100), cuenta);
        sp.output("CodMsj", database_1.mssql.Int);
        sp.output("StrMsj", database_1.mssql.VarChar(400));
        sp.execute('Asociados.sp_login', (error, results) => {
            if (!error) {
                if (results.output.CodMsj == 1) {
                    const UserInfo = results.recordset[0];
                    UserInfo.Token = createToken(UserInfo);
                    return res.status(200).send(JsonOut_1.JsonOut(results.output.CodMsj, results.output.StrMsj, UserInfo));
                }
                return res.status(401).send(JsonOut_1.JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset));
            }
            else {
                return res.status(500).send(JsonOut_1.JsonOut('0', "Se produjo un error al ejecutar", error));
            }
        });
    }
    catch (e) {
        const { Code, Message } = Connection;
        return res.status(500).send({ code: Code, Message: Message });
    }
});
exports.asociados_login = asociados_login;
const admin_login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Connection = null;
    const { StrUsuario, StrClave } = req.body;
    try {
        Connection = yield database_1.getConnection();
        const sp = yield Connection.request();
        sp.input("StrUsuario", database_1.mssql.VarChar(100), StrUsuario);
        sp.input("StrClave", database_1.mssql.VarChar(100), StrClave);
        sp.output("CodMsj", database_1.mssql.Int);
        sp.output("StrMsj", database_1.mssql.VarChar(400));
        sp.execute('Seguridad.sp_login', (error, results) => {
            if (!error) {
                if (results.output.CodMsj == 1) {
                    const UserInfo = results.recordset[0];
                    UserInfo.Token = createToken(UserInfo);
                    return res.status(200).send(JsonOut_1.JsonOut(results.output.CodMsj, results.output.StrMsj, UserInfo));
                }
                return res.status(401).send(JsonOut_1.JsonOut(results.output.CodMsj, results.output.StrMsj, results.recordset));
            }
            else {
                return res.status(500).send(JsonOut_1.JsonOut('0', "Se produjo un error al ejecutar", error));
            }
        });
    }
    catch (e) {
        const { Code, Message } = Connection;
        return res.status(500).send({ code: Code, Message: Message });
    }
});
exports.admin_login = admin_login;
