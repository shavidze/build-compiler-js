import Parser from "./compiler-frontend/Parser";
import { evaluate } from "./comiler-runtime/interpreter";
import { createGlobalEnv } from "./comiler-runtime/context";

const prompt = require("prompt-sync")();
repl();

async function repl() {
  const parser = new Parser();
  const context = new createGlobalEnv();

  while (true) {
    const input = prompt("> ");
    if (!input || input.includes("end")) {
      process.exit();
    }
    const program = parser.produceAstTree(input);
    const result = evaluate(program, context);
    console.log(JSON.stringify(result, null, 4));
  }
}
