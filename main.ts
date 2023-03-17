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
  while (true) {
    const input = prompt("> ");
    if (!input || input.includes("end")) {
      process.exit();
    }
    const program = parser.produceAstTree(input);
    const context = new Context();
    context.declareVariable("x", MK_NUMBER(190));
    context.declareVariable("null", MK_NULL());
    context.declareVariable("true", MK_BOOL(true));
    context.declareVariable("false", MK_BOOL(false));
    const result = evaluate(program, context);
    console.log(JSON.stringify(result, null, 4));
  }
}
