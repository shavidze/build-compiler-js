"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eval_object_expr = exports.eval_numeric_binary_expr = exports.eval_binary_expr = exports.eval_assignment = exports.eval_identifier = void 0;
const interpreter_1 = require("../interpreter");
const values_1 = require("../values");
function eval_identifier(ident, context) {
    const val = context.lookUpVar(ident.symbol);
    return val;
}
exports.eval_identifier = eval_identifier;
function eval_assignment(node, context) {
    if (node.assigne.kind !== "Identifier") {
        throw `Invalid LHS inside assignment expr ${JSON.stringify(node.assigne)}`;
    }
    const varname = node.assigne.symbol;
    return context.assignVar(varname, (0, interpreter_1.evaluate)(node.value, context));
}
exports.eval_assignment = eval_assignment;
function eval_binary_expr(binop, context) {
    const lhs = (0, interpreter_1.evaluate)(binop.left, context); // {value:10, kind: 'NumericLiteral'}, {value: 5, kind:'numeric'} 10
    const rhs = (0, interpreter_1.evaluate)(binop.right, context); // {value: 8, kind:'numeric'} // 5 * 8
    if (lhs.type === "number" && rhs.type === "number") {
        return eval_numeric_binary_expr(lhs, rhs, binop.operator);
    } // 10 + 5 * 8
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
function eval_object_expr(obj, context) {
    const object = {
        type: "object",
        properties: new Map(),
    };
    for (const [key, value] of object.properties) {
        //handle valid key:pair
        const runtimeVal = value === undefined ? context.lookUpVar(key) : (0, interpreter_1.evaluate)(value, context);
        object.properties.set(key, runtimeVal);
    }
    return object;
}
exports.eval_object_expr = eval_object_expr;
//# sourceMappingURL=expressions.js.map