"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwtSecret: process.env.JWT_SECRET || 'A54MB134',
    DB: {
        USER: process.env.DB_USER || 'asamblea',
        PASSWORD: process.env.DB_PASS || 'As4mbl3@',
        HOST: process.env.DB_HOST || '45.5.118.219',
        DATABASE: process.env.DB_DATABASE || 'PLR0020'
    }
};
