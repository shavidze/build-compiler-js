"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./compiler-frontend/Parser");
const interpreter_1 = require("./comiler-runtime/interpreter");
const context_1 = require("./comiler-runtime/context");
const values_1 = require("./comiler-runtime/values");
const prompt = require("prompt-sync")();
repl();
async function repl() {
    const parser = new Parser_1.default();
    const context = new context_1.default();
    context.declareVariable("true", (0, values_1.MK_BOOL)(true), true);
    context.declareVariable("false", (0, values_1.MK_BOOL)(false), true);
    context.declareVariable("null", (0, values_1.MK_NULL)(), true);
    while (true) {
        const input = prompt("> ");
        if (!input || input.includes("end")) {
            process.exit();
        }
        const program = parser.produceAstTree(input);
        console.log("program - ", program);
        const result = (0, interpreter_1.evaluate)(program, context);
        console.log(JSON.stringify(result, null, 4));
    }
}
//# sourceMappingURL=main.js.map