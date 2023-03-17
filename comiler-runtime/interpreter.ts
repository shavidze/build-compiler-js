import { RuntimeVal, NumberVal } from "./values";
import {
  BinaryExpr,
  Identifier,
  NumericLiteral,
  Program,
  Stmt,
  VarDeclaration,
} from "../compiler-frontend/Ast";
import Context from "./context";
import { eval_binary_expr, eval_identifier } from "./eval/expressions";
import { eval_program, eval_var_declaration } from "./eval/statements";
export function evaluate(astNode: Stmt, context: Context): RuntimeVal {
  debugger;
  switch (astNode.kind) {
    case "Program":
      return eval_program(astNode as Program, context);
    case "BinaryExpr":
      return eval_binary_expr(astNode as BinaryExpr, context);
    case "NumericLiteral":
      return {
        value: (astNode as NumericLiteral).value,
        type: "number",
      } as NumberVal;
    case "Identifier":
      return eval_identifier(astNode as Identifier, context);
    //handle stmts
    case "VarDeclaration":
      return eval_var_declaration(astNode as VarDeclaration, context);
    default:
      console.error(
        "This AST Node has not yet been setup for interpretation",
        astNode
      );
      process.exit();
  }
}
