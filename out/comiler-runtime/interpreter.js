"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
const values_1 = require("./values");
function eval_program(program, context) {
    let lastEval = (0, values_1.MK_NULL)();
    for (const stmt of program.body) {
        lastEval = evaluate(stmt, context);
    }
    return lastEval;
}
function eval_binary_expr(binop, context) {
    const lhs = evaluate(binop.left, context);
    const rhs = evaluate(binop.right, context);
    if (lhs.type === "number" && rhs.type === "number") {
        return eval_numeric_binary_expr(lhs, rhs, binop.operator);
    }
    return (0, values_1.MK_NULL)();
}
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
function eval_identifier(ident, context) {
    const val = context.lookUpVar(ident.symbol);
    return val;
}
function evaluate(astNode, context) {
    switch (astNode.kind) {
        case "Program":
            return eval_program(astNode, context);
        case "BinaryExpr":
            return eval_binary_expr(astNode, context);
        case "NumericLiteral":
            return {
                value: astNode.value,
                type: "number",
            };
        case "Identifier":
            return eval_identifier(astNode, context);
        default:
            console.error("This AST Node has not yet been setup for interpretation", astNode);
            process.exit();
    }
}
exports.evaluate = evaluate;
//# sourceMappingURL=interpreter.js.map