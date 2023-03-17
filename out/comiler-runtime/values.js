"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MK_BOOL = exports.MK_NUMBER = exports.MK_NULL = void 0;
/**
 *
 * Some micro styles functions like in C
 */
function MK_NULL() {
    return { type: "null", value: null };
}
exports.MK_NULL = MK_NULL;
function MK_NUMBER(n = 0) {
    return { type: "number", value: n };
}
exports.MK_NUMBER = MK_NUMBER;
function MK_BOOL(b = true) {
    return { type: "boolean", value: b };
}
exports.MK_BOOL = MK_BOOL;
//# sourceMappingURL=values.js.map