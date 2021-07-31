"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonOut = void 0;
const JsonOut = (Code, Message, Data = null) => {
    return {
        state: {
            Code: Code,
            Message: Message
        },
        data: Data
    };
};
exports.JsonOut = JsonOut;
