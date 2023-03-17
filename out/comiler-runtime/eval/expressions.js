"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eval_numeric_binary_expr = exports.eval_binary_expr = exports.eval_identifier = void 0;
const interpreter_1 = require("../interpreter");
const values_1 = require("../values");
function eval_identifier(ident, context) {
    console.log("look up variable");
    const val = context.lookUpVar(ident.symbol);
    return val;
}
exports.eval_identifier = eval_identifier;
function eval_binary_expr(binop, context) {
    const lhs = (0, interpreter_1.evaluate)(binop.left, context);
    const rhs = (0, interpreter_1.evaluate)(binop.right, context);
    if (lhs.type === "number" && rhs.type === "number") {
        return eval_numeric_binary_expr(lhs, rhs, binop.operator);
    }
    return (0, values_1.MK_NULL)();
}
exports.eval_binary_expr = eval_binary_expr;
function eval_numeric_binary_expr(lhs, rhs, operator) {
    let result = 0;
    switch (operator) {
        case "+":
            return { type: "number", value: (result = lhs.value + rhs.value) };
        case "-":
            return { type: "number", value: (result = lhs.value - rhs.value) };
        case "/":
            // TODO: check on zero
            return { type: "number", value: (result = lhs.value / rhs.value) };
        case "*":
            return { type: "number", value: (result = lhs.value * rhs.value) };
        case "%":
            return { type: "number", value: (result = lhs.value % rhs.value) };
        default:
            return { value: result, type: "number" };
    }
}
exports.eval_numeric_binary_expr = eval_numeric_binary_expr;
//# sourceMappingURL=expressions.js.map