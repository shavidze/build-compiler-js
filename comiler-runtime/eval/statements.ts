import { env } from "process";
import { Program, VarDeclaration } from "../../compiler-frontend/Ast";
import Context from "../context";
import { evaluate } from "../interpreter";
import { MK_NULL, RuntimeVal } from "../values";

export function eval_var_declaration(
  declaration: VarDeclaration,
  context: Context
): RuntimeVal {
  //check if declaration is expression
  console.log("value - ", declaration);
  const value = declaration.value
    ? evaluate(declaration.value, context)
    : MK_NULL();
  console.log("aqaa", context);
  return context.declareVariable(
    declaration.identifier,
    value,
    declaration.constant
  );
}

export function eval_program(program: Program, context: Context): RuntimeVal {
  let lastEval: RuntimeVal = MK_NULL();
  for (const stmt of program.body) {
    lastEval = evaluate(stmt, context);
  }
  return lastEval;
}
