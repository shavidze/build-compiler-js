import { RuntimeVal, NumberVal } from "./values";
import {
  AssignmentExpr,
  BinaryExpr,
  Identifier,
  NumericLiteral,
  ObjectLiteral,
  Program,
  Stmt,
  VarDeclaration,
} from "../compiler-frontend/Ast";
import Context from "./context";
import {
  eval_assignment,
  eval_binary_expr,
  eval_identifier,
  eval_object_expr,
} from "./eval/expressions";
import { eval_program, eval_var_declaration } from "./eval/statements";
export function evaluate(astNode: Stmt | any, context: Context): RuntimeVal {
  switch (astNode.kind) {
    case "Program":
      return eval_program(astNode as Program, context);
    case "BinaryExpr":
      return eval_binary_expr(astNode as BinaryExpr, context);
    case "AssignmentExpr":
      return eval_assignment(astNode as AssignmentExpr, context);
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
    case "ObjectLiteral":
      return eval_object_expr(astNode as ObjectLiteral, context);
    default:
      console.error(
        "This AST Node has not yet been setup for interpretation",
        astNode
      );
      process.exit();
  }
}
