"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
function eval_program(program) {
    let lastEval = { type: "null", value: "null" };
    for (const stmt of program.body) {
        lastEval = evaluate(stmt);
    }
    return lastEval;
}
function eval_binary_expr(binop) {
    const lhs = evaluate(binop.left);
    const rhs = evaluate(binop.right);
    if (lhs.type === "number" && rhs.type === "number") {
        return eval_numeric_binary_expr(lhs, rhs, binop.operator);
    }
    return { type: "null", value: "null" };
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
function evaluate(astNode) {
    switch (astNode.kind) {
        case "NumericLiteral":
            return {
                value: astNode.value,
                type: "number",
            };
        case "BinaryExpr":
            return eval_binary_expr(astNode);
        case "Program":
            return eval_program(astNode);
        case "NullLiteral":
            return { value: "null", type: "null" };
        default:
            console.error("This AST Node has not yet been setup for interpretation", astNode);
            process.exit();
    }
}
exports.evaluate = evaluate;
//# sourceMappingURL=interpreter.js.map