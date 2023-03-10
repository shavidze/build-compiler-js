import Parser from "./compiler-frontend/Parser";
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
    console.log(program);
  }
}
