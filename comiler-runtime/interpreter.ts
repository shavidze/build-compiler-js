import { ValueType, RuntimeVal, NumberVal, NullVal, MK_NULL } from "./values";
import {
  BinaryExpr,
  Identifier,
  NodeType,
  NumericLiteral,
  Program,
  Stmt,
} from "../compiler-frontend/Ast";
import Context from "./context";

function eval_program(program: Program, context: Context): RuntimeVal {
  let lastEval: RuntimeVal = MK_NULL();
  for (const stmt of program.body) {
    lastEval = evaluate(stmt, context);
  }
  return lastEval;
}

function eval_binary_expr(binop: BinaryExpr, context: Context): RuntimeVal {
  const lhs = evaluate(binop.left, context);
  const rhs = evaluate(binop.right, context);
  if (lhs.type === "number" && rhs.type === "number") {
    return eval_numeric_binary_expr(
      lhs as NumberVal,
      rhs as NumberVal,
      binop.operator
    );
  }
  return MK_NULL();
}

function eval_numeric_binary_expr(
  lhs: NumberVal,
  rhs: NumberVal,
  operator: string
): NumberVal {
  let result: number = 0;
  switch (operator) {
    case "+":
      return { type: "number", value: (result = lhs.value + rhs.value) };
    case "-":
      return { type: "number", value: (result = lhs.value - rhs.value) };
    case "/":
      // TODO: check on zero
      return { type: "number", value: (result = lhs.value / rhs.value) };
    case "*":
      return { type: "number", value: (result = lhs.value * rhs.value) };
    case "%":
      return { type: "number", value: (result = lhs.value % rhs.value) };
    default:
      return { value: result, type: "number" };
  }
}

function eval_identifier(ident: Identifier, context: Context): RuntimeVal {
  const val = context.lookUpVar(ident.symbol);
  return val;
}

export function evaluate(astNode: Stmt, context: Context): RuntimeVal {
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

    default:
      console.error(
        "This AST Node has not yet been setup for interpretation",
        astNode
      );
      process.exit();
  }
}
