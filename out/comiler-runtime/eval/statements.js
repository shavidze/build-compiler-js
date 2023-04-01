"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eval_program = exports.eval_var_declaration = void 0;
const interpreter_1 = require("../interpreter");
const values_1 = require("../values");
function eval_var_declaration(declaration, context) {
    //check if declaration is expression
    const value = declaration.value
        ? (0, interpreter_1.evaluate)(declaration.value, context)
        : (0, values_1.MK_NULL)();
    return context.declareVariable(declaration.identifier, value, declaration.constant);
}
exports.eval_var_declaration = eval_var_declaration;
function eval_program(program, context) {
    let lastEval = (0, values_1.MK_NULL)();
    for (const stmt of program.body) {
        lastEval = (0, interpreter_1.evaluate)(stmt, context);
    }
    return lastEval;
}
exports.eval_program = eval_program;
//# sourceMappingURL=statements.js.map