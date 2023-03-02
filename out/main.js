"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./compiler-frontend/Parser");
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
        console.log(program);
    }
}
//# sourceMappingURL=main.js.map