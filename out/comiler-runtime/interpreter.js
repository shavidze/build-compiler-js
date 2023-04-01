"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
const expressions_1 = require("./eval/expressions");
const statements_1 = require("./eval/statements");
function evaluate(astNode, context) {
    switch (astNode.kind) {
        case "Program":
            return (0, statements_1.eval_program)(astNode, context);
        case "BinaryExpr":
            return (0, expressions_1.eval_binary_expr)(astNode, context);
        case "AssignmentExpr":
            return (0, expressions_1.eval_assignment)(astNode, context);
        case "NumericLiteral":
            return {
                value: astNode.value,
                type: "number",
            };
        case "Identifier":
            return (0, expressions_1.eval_identifier)(astNode, context);
        //handle stmts
        case "VarDeclaration":
            return (0, statements_1.eval_var_declaration)(astNode, context);
        case "ObjectLiteral":
            return (0, expressions_1.eval_object_expr)(astNode, context);
        default:
            console.error("This AST Node has not yet been setup for interpretation", astNode);
            process.exit();
    }
}
exports.evaluate = evaluate;
//# sourceMappingURL=interpreter.js.map