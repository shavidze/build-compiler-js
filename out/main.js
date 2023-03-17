"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./compiler-frontend/Parser");
const interpreter_1 = require("./comiler-runtime/interpreter");
const context_1 = require("./comiler-runtime/context");
const prompt = require("prompt-sync")();
repl();
async function repl() {
    const parser = new Parser_1.default();
    const context = new context_1.default();
    while (true) {
        const input = prompt("> ");
        if (!input || input.includes("end")) {
            process.exit();
        }
        const program = parser.produceAstTree(input);
        const result = (0, interpreter_1.evaluate)(program, context);
        console.log(JSON.stringify(result, null, 4));
    }
}
//# sourceMappingURL=main.js.map