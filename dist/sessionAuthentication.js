"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionID = void 0;
const uuid_1 = require("uuid");
function createSessionID() {
    const sessionId = (0, uuid_1.v4)();
    return sessionId;
}
exports.createSessionID = createSessionID;
