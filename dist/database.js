"use strict";
/**
 * @fileoverview Connection for the database
 *
 * @author Gabriel Guerrero
 * @version 1.0
 *
 **/
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
exports.getConnection = exports.mssql = void 0;
const config_1 = __importDefault(require("./config/config"));
exports.mssql = require('mssql');
let pool;
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const ConnectionString = {
            user: config_1.default.DB.USER,
            password: config_1.default.DB.PASSWORD,
            server: config_1.default.DB.HOST,
            database: config_1.default.DB.DATABASE,
            options: {
                encrypt: false,
                enableArithAbort: true
            }
        };
        let conPool = new exports.mssql.ConnectionPool(ConnectionString);
        try {
            pool = yield conPool.connect();
            pool.on("error", function (e) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("connection pool error", e);
                    yield closePool();
                });
            });
            return pool;
        }
        catch (e) {
            pool = null;
            return {
                Code: e.code,
                Message: e.message
            };
        }
    });
}
exports.getConnection = getConnection;
function closePool() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield pool.close();
            pool = null;
        }
        catch (e) {
            pool = null;
            console.error("Error", e);
        }
    });
}
