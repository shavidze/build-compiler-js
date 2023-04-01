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

  context.declareVariable("true", MK_BOOL(true), true);
  context.declareVariable("false", MK_BOOL(false), true);
  context.declareVariable("null", MK_NULL(), true);

  while (true) {
    const input = prompt("> ");
    if (!input || input.includes("end")) {
      process.exit();
    }
    const program = parser.produceAstTree(input);
    console.log("program - ", program);
    const result = evaluate(program, context);
    console.log(JSON.stringify(result, null, 4));
  }
}
