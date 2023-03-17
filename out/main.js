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
    while (true) {
        const input = prompt("> ");
        if (!input || input.includes("end")) {
            process.exit();
        }
        const program = parser.produceAstTree(input);
        const context = new context_1.default();
        context.declareVariable("x", (0, values_1.MK_NUMBER)(190));
        context.declareVariable("null", (0, values_1.MK_NULL)());
        context.declareVariable("true", (0, values_1.MK_BOOL)(true));
        context.declareVariable("false", (0, values_1.MK_BOOL)(false));
        const result = (0, interpreter_1.evaluate)(program, context);
        console.log(JSON.stringify(result, null, 4));
    }
}
//# sourceMappingURL=main.js.map