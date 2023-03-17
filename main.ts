import Parser from "./compiler-frontend/Parser";
import { evaluate } from "./comiler-runtime/interpreter";
import Context from "./comiler-runtime/context";
import {
  MK_BOOL,
  MK_NULL,
  MK_NUMBER,
  NumberVal,
} from "./comiler-runtime/values";
const prompt = require("prompt-sync")();
repl();

async function repl() {
  const parser = new Parser();
  const context = new Context();

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
